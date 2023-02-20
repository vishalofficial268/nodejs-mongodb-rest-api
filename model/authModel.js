let { ObjectId } = require("mongodb");

const checkExistingUser = async (email, contact) => {
    let userEmail = (email) ? email.trim().toLowerCase() : null;
    let contactNumber = (contact) ? Number(contact) : null;
    if (userEmail || contactNumber) {
        let userRecord = await dbs.collection('users').find({ email: userEmail, phone: contactNumber })
        if (userRecord && Object.keys(userRecord).length > 0) {
            return {
                success: true,
                message: "User Record found.",
                data: userRecord
            }
        } else {
            return {
                success: false,
                message: "User Record not found.",
                data: null
            }
        }
    } else {
        return {
            success: false,
            message: "Please provide either the user email or phobe number.",
            data: null
        }
    }
}




module.exports = {
    checkExistingUser,
}
