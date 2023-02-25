let { ObjectId } = require("mongodb");
let { getDbConnection } = require('../config/db');



/**
 * 
 * @param {*} reqObj 
 * This model can query dynamically based on the collections name
 * Based on the projection
 * Can be add sort, limit
 */
const findByQuery = async (reqObj) => {
    const { query, projection, sort, limit } = reqObj;
    if (reqObj && Object.keys(reqObj).length > 0) {
        var db = await getDbConnection();
        const result = await db.collection(collectionName)
            .find(query, projection)
            .sort(sort)
            .limit(limit)
            .toArray()
        if (result && (result.length > 0 || Object.keys(result).length > 0)) {
            return {
                success: true,
                message: "Data found.",
                data: result
            }
        } else {
            return {
                success: false,
                message: "Data not found.",
                data: null
            }
        }
    } else {
        return {
            success: false,
            message: "Please send query properly as mongodb accepts.",
            data: null
        }
    }
}


module.exports = {
    findByQuery
}