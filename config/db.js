const { MongoClient } = require('mongodb');
const mongo_url = "mongodb://127.0.0.1/27017/";
let dbConnection;

module.exports = {
    connectToDb: async (cb, db_name = "employees") => {
        try {
            let client = await MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
            dbConnection = client.db(db_name);
            return cb();
        } catch (error) {
            console.log(error);
            return cb;
        }
    },
    getDb: () => dbConnection
}