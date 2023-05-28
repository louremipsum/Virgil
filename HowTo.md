# How To Setup and Run the Project

## Prerequsites

First we will setup the databases which we will use in our project, MongoDB is used for storing the scrapped documents and MongoDB Atlas for Search Index which will be used for finding the data and query(Mongo Realm). Redis is used for storing queue(list) of unvisited links while scraping using RedisSpider.

### MongoDB

Create a Cluster and Database and collection. Note the Database and collection name
The Aggregation piplines and Index JSON files will be in Backend folder for MongoDB Realm

### Redis

Setup a Redis Server on local(Recommeneded) or on Cloud
Follow the instruction on how to setup a Redis server on Redis website
My platform is Windows so i had to run the Redis on WSL as it is not directly supported on windows
I started the server and then opened RedisInsight(which is like Mongo Compass for Redis) and connected to my local server in it to monitor if my project is correctly enqueing the URLs into the list
The project already has the Redis credential setup from local server POV

### ScraperOPs

Setup an account on scraperops and get an API key for FakeUserAgents and FakeBrowerHeader to use in the project

### Backend

Change the name from `set.env` to `.env` and fill the appropriate keys 
setup a virtualenv and activate it(the command for that will be in Backend\Crawling\Crawling\spiders in cmd.md file)
type `pip install -r requirements.txt` in base directory of `\Backend` folder
