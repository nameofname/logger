# Pint Sized Logger

A pint-sized logger for Node.js and javascript.

- colorizes output
- detects arrays and objects
- respects LOG_LEVEL environment variable
- infinitesimally small - fits in the palm of you hand

```js
process.env.LOG_LEVEL = 'trace'; // or require('dotenv').config();

const logger = require('pint-sized-logger');

logger.error('Oooooooh snap an error!'); 

logger.warn('Aaaaw shux, a warning'); 

logger.info('Well gee, it\'s info'); 

logger.trace('Neato, a trace'); 

```
