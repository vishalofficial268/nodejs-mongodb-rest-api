const express = require('express');
const { connectToDb, getDb } = require('./config/db');
const PORT = process.env.PORT || 5050;
const morgan = require('morgan');
const initRouterLoader = require('./routes/initRouterLoader');
const app = express();
let db;


//db connection:
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
        db = getDb();
        global.dbs = db;
    } else {
        console.log('Oops ! something went wrong, while mongo connection stablishment.')
    }
})


//middlewares:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb', parameterLimit: 50000 }));
app.use('/v1.0', initRouterLoader);
app.use(morgan('dev'));
// app.use(error_handler(req, res, next));


//Home Page Routes:
app.get('/', async (req, res) => {
    res.send("Welcome to Node-Mongodb REST APIs");
});