const authModel = require('../model/authModel');
const utility = require('../utility/common');
const validationCtrl = require('../utility/validation');






const signUpUser = async (req, res) => {
    try {
        let body = req.body;
        let validation = await validationCtrl.signUpUserSchemaValidation(body);
        if (validation.schemaValidation === false) return validation;
        let email = body.email.trim().toLowerCase();
        let existingUser = await authModel.checkExistingUser(email);
        if (!existingUser.success) {
            let genPassword = await utility.generateUniquePassword();
            body.email = email;
            body.password = genPassword.hashedPassword;
            body.createdAt = new Date();
            body.isActive = true;

            let createUserRecord = await authModel.userSignUp(body);
            if (createUserRecord && createUserRecord.success) {
                let getCookie = await utility.generateCookies(createUserRecord.insertedId, email);
                if (getCookie && Object.keys(getCookie).length > 0) {
                    let { token, cookieConfig } = getCookie;
                    res.cookie("jwt", token, cookieConfig);
                }
                return {
                    success: true,
                    message: "User record created successfully!",
                    data: createUserRecord.insertedId,
                    password: genPassword.password,
                }

            } else {
                return createUserRecord;
            }
        } else {
            return {
                sucess: false,
                message: "Sorry! This user is already exists."
            };
        }

    } catch (error) {
        return error.stack;
    }
}


const logInUser = async (req, res) => {
    try {
        let body = req.body;
        let email = body.email.trim().toLowerCase();
        let existingUser = await authModel.checkExistingUser(email);
        if (existingUser && existingUser.success) {
            let userPassword = body.password;
            let hashedPassword = existingUser.data.password;
            let comparePassword = await utility.verifyUserPassword(userPassword, hashedPassword);
            if (comparePassword) {
                let getCookie = await utility.generateCookies(existingUser.data._id, email);
                if (getCookie && Object.keys(getCookie).length > 0) {
                    let { token, cookieConfig } = getCookie;
                    res.cookie("jwt", token, cookieConfig);
                }
                return {
                    success: true,
                    message: "User logged in successfully!",
                }
            } else {
                return {
                    success: false,
                    message: "User password does not match, please check and try again."
                }
            }
        } else {
            return {
                success: false,
                message: "Sorry! This user does not found, Please check and try again."
            }
        }
    } catch (error) {
        return error.stack
    }
}

const resetuserPassword = async (req) => {
    try {
        let userObj = req.body;
        if (userObj && Object.keys(userObj).length > 0) {
            let oldPassword = userObj.oldPassword;
            let newPassword = userObj.newPassword;
            let email = userObj.email.trim().toLowerCase();
            let getUser = await authModel.checkExistingUser(email);

            if (getUser && getUser.success) {
                let comparePassword = await utility.verifyUserPassword(oldPassword, getUser.data.password);
                if (comparePassword) {
                    let encryptedPassword = await utility.getHashedPassword(newPassword);
                    if (encryptedPassword.success) {
                        let updatePassword = await authModel.updatePassword(email, encryptedPassword.hashedPassword);
                        return updatePassword;
                    }
                } else {
                    return {
                        success: false,
                        message: "User old password does not match, please check and try again."
                    }
                }
            } else {
                return {
                    success: false,
                    message: "Sorry! This user does not found, Please check and try again."
                }
            }
        }
    } catch (error) {
        return error.stack
    }
}



module.exports = {
    signUpUser,
    logInUser,
    resetuserPassword
}