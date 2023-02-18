const { ObjectID } = require('mongodb');
const userModel = require('../model/userModel');


const createUserDetails = async (req) => {
    try {
        let body = req.body;
        let { email } = body;
        let existingUser = await userModel.existingUserByEmail(email);
        if (!existingUser) {
            let createUser = await userModel.createUser(body);
            return createUser;
        } else {
            return {
                success: true,
                message: "Sorry! This user is already registered."
            }
        }
    } catch (error) {
        return error.stack;
    }
}


const getAllUsersDetails = async (req) => {
    try {
        let allUsers = await userModel.getAllUsers();
        return allUsers;
    } catch (error) {
        return error.stack;
    }
}


const getUserById = async (req) => {
    try {
        let userId = ObjectID(req.body.id);
        if (userId) {
            let userDetails = await userModel.getUserById(userId);
            return userDetails;
        } else {
            return {
                success: false,
                message: "Please provide a valid _id"
            }
        }
    } catch (error) {
        return error;
    }
}

const updateUser = async (req) => {
    try {
        let body = req.body;
        let { userId } = body;
        if (userId && Object.keys(body).length > 1) {
            let updateUser = await userModel.updateUserById(body);
            return updateUser;
        } else {
            return {
                success: false,
                message: "Please provide the userId and details."
            }
        }
    } catch (error) {
        error.stack;
    }
}

const deleteUser = async (req) => {
    let body = req.body;
    let { userId } = body;
    if (userId) {
        let deleteUserDetails = await userModel.deleteUserById(userId);
        return deleteUserDetails;
    } else {
        return {
            success: false,
            message: "Please provide the user id to delete the user."
        }
    }
}


module.exports = {
    createUserDetails,
    getAllUsersDetails,
    getUserById,
    updateUser,
    deleteUser
}