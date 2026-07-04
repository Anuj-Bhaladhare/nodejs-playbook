const bcrypt = require("bcrypt");
const {
    checkUserExist,
    createUserModel,
    getUserModel,
    updateUserModel,
    deleteUserModel
} = require("./../moduls/userModule");


const createUserController = async (req, res) => {
    try {

        const {
            email, firstName, lastName, contact, accounts, password, provider, country, currency
        } = req.body;

        if (!email || !firstName || !lastName || !contact || !accounts || !password || !provider || !country || !currency) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide proper data || data is not present properlly",
            });
        }

        // check user is allready present 
        const check_user_result = await checkUserExist(email);

        if (check_user_result === true) {
            return res.status(409).json({
                "success": false,
                "message": "User Allready EXIST",
            });
        }

        // encrypt password
        const encrypted_pass = await bcrypt.hash(password, 10);

        if (!encrypted_pass) {
            return res.status(400).json({
                "success": false,
                "message": "Password NOT Encrypted"
            });
        } 

        // database call
        const database_result = await createUserModel(email, firstName, lastName, contact, accounts, encrypted_pass, provider, country, currency);
        if (database_result) {
            return res.status(200).json({
                "success": true,
                "message": "User Created Successfully",
                "user_data": database_result[0] 
            });
        }

        return res.status(400).json({
            "success": false,
            "message": "Database error | user not created"
        });

    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

const getUserController = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            console.log("Email is not present || please provide valid email address");

            return res.status(400).json({
                "success": false,
                "message": "Email is not present || please provide valid email address",
            });
        }

        const db_result = await getUserModel(email);

        if (db_result) {
            return res.status(200).json({
                "success": true,
                "message": "User Get Successfully",
                "data": db_result[0]
            })
        } else {
            return res.status(404).json({
                "success": false,
                "message": "User Not Found"
            });
        }

    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

const updateUserController = async (req, res) => {
    try {
        console.log("updateUserController");

    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

const deleteUserController = async (req, res) => {
    try {
        console.log("deleteUserController");
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

module.exports = {
    createUserController,
    getUserController,
    updateUserController,
    deleteUserController
}
