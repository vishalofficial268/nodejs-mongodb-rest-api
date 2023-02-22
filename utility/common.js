const crypto = require("crypto");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const maxAge = 3 * 60 * 60;
const saltRounds = 10;
const jwtSecretKey = crypto.randomBytes(35).toString("hex");


const generateUniquePassword = async () => {

    const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const number = '1234567890';
    const alphaNumeric = "!@#$%&*";
    const generatorArray = [].concat(string.split("")).concat(number.split("")).concat(alphaNumeric.split(""));
    const passwordLength = 10;
    let password = [];
    for (let i = 0; i < passwordLength; i++) {
        let index = Math.floor(Math.random() * generatorArray.length);
        password.push(generatorArray[index]);
    }
    password = password.join("");
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return {
        password: password,
        hashedPassword: hashedPassword
    };
}



const verifyUserPassword = async (userPassword, hashedPassword) => {

    let comparePassword = await bcrypt.compareSync(userPassword, hashedPassword);
    if (comparePassword) {
        return comparePassword;
    } else {
        return false;
    }
}



const getHashedPassword = async (userPassword) => {

    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(userPassword, salt);
    if (hashedPassword) {
        return {
            success: true,
            hashedPassword: hashedPassword
        };
    } else {
        return {
            success: false,
            message: "Something went wrong while hasing the password."
        };
    }
}



const generateCookies = async (userId, userEmail) => {
    try {
        const token = jwt.sign(
            { id: userId, userEmail: userEmail },
            jwtSecretKey,
            { expiresIn: maxAge }
        )
        let cookie = {
            token: token,
            cookieConfig: { httpOnly: true, maxAge: maxAge * 1000 }
        }
        return cookie;
    } catch (error) {
        return error.stack;
    }
}




module.exports = {
    generateUniquePassword,
    verifyUserPassword,
    getHashedPassword,
    generateCookies
}