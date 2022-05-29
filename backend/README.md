For the backend I went with a nestJS app with redis and mongoDB. I really thought to use Symphony but as I have to remember some things I prefer to do it with nest

Live demo: https://tennders-back.herokuapp.com/docs/

In the demo you can see the endpoints and test them. The redis cache is set to 20 seconds. 

for the local enviroment I went with docker

postman: https://www.getpostman.com/collections/452b158a28bdc7f0239c

## local installation and initialization

Install dependencies
```bash
npm install
```
Install and Start docker services
```
npm run dev:dockerServices
```

Check the enviroment variables
```
# LOCAL VARIABLES:
PORT = 3001
MONGODB_URL = 'mongodb://nest:password123@localhost:27017/tennders'
REDIS_URL = 'redis://localhost:6379'
REDIS_CACHE_TIME_SECONDS = 20

# REMOTE VARIABLES: 
PORT = 3001
MONGODB_URL = 'mongodb+srv://tennders:9NLOd2zT8tCy3mld@tenndersbackend.fmfdipm.mongodb.net/tennders'
REDIS_URL = 'redis://default:Pi9ktXIpQMg1b3ggbTdfE620xD2J4Rf0@redis-13346.c253.us-central1-1.gce.cloud.redislabs.com:13346/0'
REDIS_CACHE_TIME_SECONDS = 20

```
Start development enviroment
```
npm run dev
```



### REMOTE DB: 
This is the remote mongodbmodule, in case to use the remote db delete ssl, and authsource, objects this is due the limitations of the database and the server were is hosted. 

````
// database.module.ts

export const MongoDBModule = [
  // DATABASE MODULE
  TypeOrmModule.forRootAsync({
    inject: [config.KEY],
    useFactory: (configuration: ConfigType<typeof config> = config()) => {
      const url = configuration.mongodb.url;

      return {
        type: 'mongodb',
        url,
        useUnifiedTopology: true,
        synchronize: true,
        useNewUrlParser: true,
        entities: [TruckEntity, EventEntity],
      };
    },
  }),
];

````
