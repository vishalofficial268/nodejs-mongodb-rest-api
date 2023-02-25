const { config } = require('./constant');
const { MongoClient } = require('mongodb');
const MONGO_URI = config.MONGO_URI;
let dbConnection;

const getDbConnection = async () => {
    try {
        let client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        dbConnection = client.db();
        global.dbs = dbConnection;
        return dbConnection;
    } catch (error) {
        console.log(error);
        return cb;
    }
}

module.exports = {
    getDbConnection
}