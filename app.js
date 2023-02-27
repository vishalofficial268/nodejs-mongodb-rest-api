const express = require('express');
const serverless = require('serverless-http');
const morgan = require('morgan');
const { config } = require('./config/constant');
const cookieParser = require('cookie-parser');
const initRouterLoader = require('./routes/initRouterLoader');
const JSONDATA = require('/opt/nodejs/data.json');
const { addTwoNumbers } = require('/opt/nodejs/common.js');
const app = express();
const PORT = config.PORT;
const HOST = config.HOST;



//middlewares:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb', parameterLimit: 50000 }));
app.use('/v1.0', initRouterLoader);
app.use(cookieParser())
app.use(morgan('dev'));


//Home Page Routes:
app.get('/', async (req, res) => {
    res.send("Welcome to NodeJS-Mongodb REST APIs with Lambda Function.");
});


/**
 * This is to check the utility file as from the layers:
 */
app.get('/dummy-data', async (req, res) => {
    res.json(JSONDATA);
});

/**
 * This is to check the utility file as from the layers:
 */
app.post('/add-two-numbers', async (req, res) => {
    let result = await addTwoNumbers(req);
    res.json(result);
});
/**
 * If the App is deployed over the Lambad function, No need to app.listen:
 * Only we need to export the whole application to serverless
 */

// app.listen(PORT, () => {
//     console.log(`app is running at ${HOST + ":" + PORT}`);
// })

module.exports.handler = serverless(app);