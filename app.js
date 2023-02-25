const express = require('express');
const serverless = require('serverless-http');
const morgan = require('morgan');
const { config } = require('./config/constant');
const cookieParser = require('cookie-parser');
const initRouterLoader = require('./routes/initRouterLoader');
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
    res.send("Welcome to NodeJS-Mongodb REST APIs");
});

/**
 * If the App is deployed over the Lambad function, No need to app.listen:
 * Only we need to export the whole application to serverless
 */

app.listen(PORT, () => {
    console.log(`app is running at ${HOST + ":" + PORT}`);
})

// module.exports.handler = serverless(app);