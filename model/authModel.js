let { ObjectId } = require("mongodb");

const checkExistingUser = async (email) => {
    try {
        let existingUser = await dbs.collection('users').findOne({ email: email, isActive: true });
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
        let createdUser = await dbs.collection('users').insertOne(userObj);
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
        if (hashedPassword) {
            let updatePassword = await dbs.collection('users').updateOne(
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
