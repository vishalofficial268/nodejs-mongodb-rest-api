let responseObj = {};
let { ObjectID } = require("mongodb")

/** check the user with the same email exists or not */

const existingUserByEmail = async (email) => {
    if (email) {
        email = email.trim().toLowerCase();
        let existingUser = await dbs.collection('users').findOne({ email });
        if (existingUser && Object.keys(existingUser).length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

/** To create the new user */
const createUser = async (req) => {
    try {
        let userObj = req;
        let createdUser = await dbs.collection('users').insertOne(userObj);
        if (createdUser && createdUser.insertedId) {
            console.log('Users created successfully.')
            return responseObj = {
                success: true,
                message: 'Users created successfully.',
                data: createdUser.insertedId
            }
        } else {
            return responseObj = {
                success: false,
                message: 'User could not be created successfully.s',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To get all the users */
const getAllUsers = async () => {
    try {
        let allUsers = dbs.getCollection('users').find({}).toArray();
        if (allUsers && allUsers.length > 0) {
            return responseObj = {
                success: true,
                message: 'Users records found.',
                data: allUsers
            }
        } else {
            return responseObj = {
                success: false,
                message: 'Users records not found.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To get the user by its Id */
const getUserById = async (req) => {
    try {
        let body = req.body;
        let userId = ObjectID(body._id);
        let userDetails = dbs.getCollection('users').findOne(userId).toArray();

        if (userDetails && userDetails.length > 0) {
            return responseObj = {
                success: true,
                message: 'Users records found.',
                data: userDetails
            }
        } else {
            return responseObj = {
                success: false,
                message: 'Users records not found.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To update the user by its Id */
const updateUserById = async (req) => {
    try {
        let body = req.body;
        let userId = ObjectID(body._id);
        let updatedUser = dbs.getCollection('users').updateOne(userId).toArray();

        if (updatedUser && updatedUser.length > 0) {
            return responseObj = {
                success: true,
                message: 'Users records found.',
                data: updatedUser._id
            }
        } else {
            return responseObj = {
                success: false,
                message: 'Users records not found.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To delete the user by its Id */
const deleteUserById = async (req) => {
    try {
        let body = req.body;
        let userId = ObjectID(body._id);
        let deleted = dbs.getCollection('users').deleteOne(userId);

        if (deleted && deleted.length > 0) {
            return responseObj = {
                success: true,
                message: 'Users records found.',
                data: deleted
            }
        } else {
            return responseObj = {
                success: false,
                message: 'Users records not found.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}


module.exports = {
    existingUserByEmail,
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}