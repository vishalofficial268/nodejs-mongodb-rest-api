let responseObj = {};
let { ObjectId } = require("mongodb");
let { getDbConnection } = require('../config/db');
/** check the user with the same email exists or not */

const existingUserByEmail = async (email) => {
    var db = await getDbConnection();
    if (email) {
        email = email.trim().toLowerCase();
        let existingUser = await db.collection('users').findOne({ email });
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
        var db = await getDbConnection();
        let userObj = req;
        let createdUser = await db.collection('users').insertOne(userObj);
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
        var db = await getDbConnection();
        let allUsers = await db.collection('users').find({}).toArray();
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
const getUserById = async (userId) => {
    try {
        var db = await getDbConnection();
        let userDetail = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (userDetail && Object.keys(userDetail).length > 0) {
            return responseObj = {
                success: true,
                message: 'User records found.',
                data: userDetail
            }
        } else {
            return responseObj = {
                success: false,
                message: 'User records not found.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To update the user by its Id */
const updateUserById = async (userId, updateObj) => {
    try {
        var db = await getDbConnection();
        let updatedUser = await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updateObj });
        if (updatedUser && Object.keys(updatedUser).length > 0) {
            return responseObj = {
                success: true,
                message: 'User records updated.',
                data: updatedUser._id
            }
        } else {
            return responseObj = {
                success: false,
                message: 'User records not updated.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

/** To delete the user by its Id */
const deleteUserById = async (userId) => {
    try {
        var db = await getDbConnection();
        let deletedUser = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
        if (deletedUser && Object.keys(deletedUser).length > 0) {
            return responseObj = {
                success: true,
                message: 'User records deleted.',
                data: deletedUser
            }
        } else {
            return responseObj = {
                success: false,
                message: 'User records not deleted.',
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