const signUpUserSchemaValidation = async (userObj) => {
    let validation;
    let schema = {
        firstName: "string",
        lastName: "string",
        email: "string",
        contact: "number",
    }


    if (userObj && Object.keys(userObj).length > 0) {
        for (let key in schema) {
            if (userObj.hasOwnProperty(key)) {
                if (typeof userObj[key] === schema[key]) {
                    validation = true;
                } else {
                    validation = {
                        schemaValidation: false,
                        message: `${key} field is required as '${schema[key]}' format.`
                    }
                }
            } else {
                validation = {
                    schemaValidation: false,
                    message: `${key} is required.`
                }
            }
        }
    } else {
        validation = {
            schemaValidation: false,
            message: `User Details required the schema format please check.`,
            schema: schema
        }
    }
    return validation;
}


module.exports = {
    signUpUserSchemaValidation,
}