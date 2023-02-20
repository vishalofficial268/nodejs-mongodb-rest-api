const config = {
    MONGO_URI: 'mongodb://127.0.0.1:27017',
    DB_NAME: "company",
    PORT: process.env.PORT || 5050,
    HOST: "http://localhost:",

}

module.exports = {
    config
};