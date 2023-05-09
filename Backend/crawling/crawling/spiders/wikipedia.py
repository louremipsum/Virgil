import scrapy
from urllib.parse import urljoin
from crawling.items import CrawlingItem
from scrapy_redis.spiders import RedisSpider
import redis
from redis import from_url
from dotenv import load_dotenv
import os

load_dotenv()


class WikipediaSpider(RedisSpider):
    name = "wikipedia"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = ["https://en.wikipedia.org/wiki/ISBN"]
    
    redis_key = 'wikipedia_queue:start_urls'
    
    redis_batch_size = 1
    """
    Number of url to fetch from redis on each attempt
    Update this as needed - this will be 16 by default (like the concurrency default)
    """
    
    # max_idle_time = 7
    """Max idle time(in seconds) before the spider stops checking redis and shuts down"""

    # custom_settings = {
    #     'FEEDS': {
    #         'wiki.json': {'format': 'json', 'overwrite':False},
    #     }
    # }
    def parse(self, response):
        self.visited = set()
        """
        Stores the visited links so that they are not traversed again
        """

        # Create a redis client
        redisClient = redis.Redis('localhost', 6379, 0)

        page_item = CrawlingItem()
        text = ""
        n = 1
        invalid_extensions = (".docx", ".doc", ".avi", ".mp4", ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".gz", ".rar", ".tar", ".tgz", ".zip", ".exe", ".js", ".css", ".ppt")
        
        while True:
            paragraph = response.xpath(f'//*[@id="mw-content-text"]/div[1]/p[{n}]')
            if not paragraph.get():
                break
            text += paragraph.get()
            for link in paragraph.css('a::attr(href)').getall():
                if link.startswith('#cite_note-') or link.startswith('Category:'):
                    continue
                absolute_link = urljoin(response.url, link)
                if absolute_link.startswith("https://en.wikipedia.org/") and not absolute_link.endswith(invalid_extensions):
                    if(absolute_link not in self.visited):
                        self.visited.add(absolute_link)
                        # Push URLs to Redis Queue
                        redisClient.lpush('wikipedia_queue:start_urls', absolute_link)
            n += 1
           
        title = response.xpath('normalize-space(//h1[@id="firstHeading"])').get()
        url = response.url
    
        page_item['title']= title
        page_item['url']=url
        page_item['text']= text
        
        yield page_item