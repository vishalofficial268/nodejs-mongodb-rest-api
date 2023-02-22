const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { connectToDb, getDb } = require('./config/db');
const { config } = require('./config/constant');
const initRouterLoader = require('./routes/initRouterLoader');
const app = express();
let db;


//db connection:
connectToDb((err) => {
    if (!err) {
        app.listen(config.PORT, () => {
            console.log(`Server is running at ${config.HOST + config.PORT}`);
        });
        db = getDb();
        global.dbs = db;
        console.log("current database name ::: ", dbs.databaseName);
    } else {
        console.log('Oops ! something went wrong, while mongo connection stablishment.')
    }
})


//middlewares:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb', parameterLimit: 50000 }));
app.use('/v1.0', initRouterLoader);
app.use(cookieParser())
app.use(morgan('dev'));


//Home Page Routes:
app.get('/', async (req, res) => {
    res.send("Welcome to Node-Mongodb REST APIs");
});