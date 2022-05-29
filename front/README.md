For the front end I went with a nextJS, I implemented redux, I just created 1 unit testing and 2 end-to-end testing, with cypress. Very fews I know...

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
