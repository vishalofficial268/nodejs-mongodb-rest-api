const { config } = require('./constant');
const { MongoClient } = require('mongodb');
const MONGO_URI = config.MONGO_URI;
const DB_NAME = config.DB_NAME;
let dbConnection;

module.exports = {
    connectToDb: async (cb, DB_NAME) => {
        try {
            let client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            dbConnection = client.db(DB_NAME);
            return cb();
        } catch (error) {
            console.log(error);
            return cb;
        }
    },
    getDb: () => dbConnection
}