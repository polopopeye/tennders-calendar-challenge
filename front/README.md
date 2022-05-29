For the front end I went with a nextJS, 

* I implemented redux, 
* I just created 1 unit testing and 2 end-to-end testing, with cypress. Very fews I know...
* For the CSS i like to use some libs or framework, as It was prohibited in the challenge I created some basics with Sass, but due the time I did it with plain style objects.


Live Demo: https://tennders-front.herokuapp.com/

# local installation and initialization

Install dependencies
```bash
npm install
```
Start development enviroment
```
npm run dev
```

Check the enviroment variables

``next.config.js``
```
  env: {
    BASE_API_URL: 'http://localhost:3001',
  },

```

# Testing
``npm run test:watch`` to run JEST
``npm run test:int`` to run Cypress enviroment


