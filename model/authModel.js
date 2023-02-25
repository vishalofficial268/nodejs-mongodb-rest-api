let { ObjectId } = require("mongodb");
let { getDbConnection } = require('../config/db');



const checkExistingUser = async (email) => {
    try {
        var db = await getDbConnection();
        let existingUser = await db.collection('users').findOne({ email: email, isActive: true });
        if (existingUser && existingUser._id) {
            return {
                success: true,
                data: existingUser
            }
        } else {
            return {
                success: false,
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}

const userSignUp = async (userObj) => {
    try {
        var db = await getDbConnection();
        let createdUser = await db.collection('users').insertOne(userObj);
        if (createdUser && createdUser.insertedId) {
            return {
                success: true,
                message: 'User created successfully!',
                insertedId: createdUser.insertedId
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong while creating the user.',
                data: null
            }
        }
    } catch (error) {
        return error.stack;
    }
}


const updatePassword = async (email, hashedPassword) => {
    try {
        var db = await getDbConnection();
        if (hashedPassword) {
            let updatePassword = await db.collection('users').updateOne(
                { email: email },
                {
                    $set: {
                        password: hashedPassword,
                        updateAt: new Date()
                    }
                },
                { upsert: true }
            )
            if (updatePassword && Object.keys(updatePassword).length > 0) {
                return {
                    success: true,
                    message: "Password updated successfully!"
                }
            } else {
                return {
                    success: false,
                    message: "Something went wrong while password updation."
                }
            }
        }
    } catch (error) {
        return error.stack
    }
}





module.exports = {
    checkExistingUser,
    userSignUp,
    updatePassword
}
