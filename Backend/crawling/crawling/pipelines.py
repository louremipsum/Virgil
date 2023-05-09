# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from lxml import html
from bs4 import BeautifulSoup
from scrapy.exceptions import CloseSpider
import re
import scrapy
from dotenv import load_dotenv
import os

load_dotenv()

class CrawlingPipeline:
    def process_item(self, item, spider):
        contractions = {
         "ain't": "am not",
         "aren't": "are not",
         "can't": "cannot",
         "can't've": "cannot have",
         "could've": "could have",
         "couldn't": "could not",
         "couldn't've": "could not have",
         "didn't": "did not",
         "doesn't": "does not",
         "don't": "do not",
         "hadn't": "had not",
         "hadn't've": "had not have",
         "hasn't": "has not",
         "haven't": "have not",
         "he'd": "he had",
         "he'd've": "he would have",
         "he'll": "he will",
         "he'll've": "he will have",
         "he's": "he is",
         "how'd": "how did",
         "how'd'y": "how do you",
         "how'll": "how will",
         "how's": "how is",
         "I'd": "I had",
         "I'd've": "I would have",
         "I'll": "I will",
         "I'll've": "I will have",
         "I'm": "I am",
         "I've": "I have",
         "isn't": "is not",
         "it'd": "it had",
         "it'd've": "it would have",
         "it'll": "it will",
         "it'll've": "it will have",
         "it's": "it is",
         "let's": "let us",
         "ma'am": "madam",
         "mayn't": "may not",
         "might've": "might have",
         "mightn't": "might not",
         "mightn't've": "might not have",
         "must've": "must have",
        }
        text = item['text']
        # Remove HTML tags
        text = html.fromstring(text).text_content()
        # Remove unwanted characters
        text = text.replace(u'\xa0', u' ')
        # pattern to match citations in square brackets
        pattern = r'\[[^\]]+\]'

        # replace citations with an empty string
        text = re.sub(pattern, '', text)
        # Remove leading and trailing whitespaces
        text = text.strip()
        text = " ".join(text.split())
        text = text.lower()
        
        # This function replaces contractions with their expanded form.
        pattern = re.compile("|".join(contractions.keys()))
        text = pattern.sub(lambda match: contractions[match.group(0)], text)
        # Remove non-alphanumeric characters and extra spaces
        # text = re.sub(r'[^a-zA-Z0-9\s]+', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        # Update the item with the cleaned text
        
        item['text'] = text
        return item


import pymongo
import sys
# from .items import CrawlingItems
from crawling.items import CrawlingItem

class MongoDBPipeline:

    collection = "document"
    
    def __init__(self, mongodb_uri, mongodb_db):
        self.mongodb_uri = os.getenv('MONGODB_URI')
        self.mongodb_db = os.getenv('MONGODB_DATABASE', 'items')
        if not self.mongodb_uri: sys.exit("You need to provide a Connection String.")

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
          mongodb_uri= os.getenv('MONGODB_URI'),
          mongodb_db= os.getenv('MONGODB_DATABASE', 'items')
    )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongodb_uri)
        self.db = self.client[self.mongodb_db]
        # # Start with a clean database
        # self.db[self.collection].delete_many({})


    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        data = dict(CrawlingItem(item))
        self.db[self.collection].insert_one(data)
        return item