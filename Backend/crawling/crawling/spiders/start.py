import redis
from redis import from_url
from dotenv import load_dotenv
import os

load_dotenv()

# Create a redis client
redisClient = redis.Redis('localhost', 6379, 0)

# Push URLs to Redis Queue
redisClient.lpush('wikipedia_queue:start_urls', "https://en.wikipedia.org/wiki/ISBN")