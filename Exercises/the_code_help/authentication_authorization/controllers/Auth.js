const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { loginUserModel, signUpUserModel, checkUserModule } = require("./../module/User.js");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Provide all Details Properlly"
            })
        }

        const db_result = await loginUserModel(email);
        if ( !db_result ) {
            return res.status(400).json({
                "success": false,
                "message": "User Not Exist"
            })
        }

        // JWT token integration
        const payload = {
            id: db_result.id,
            email: db_result.email,
            role: db_result.role
        }

        if ( await bcrypt.compare(password, db_result.password) ) {

            let token = jwt.sign(
                payload,
                process.env.JWT_SECRETE,
                {
                    expiresIn: "2h"
                }
            )
            db_result.token = token;
            db_result.password = undefined;
            const options = {
                expires: new Date( Date.now() + 30000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                db_result, 
                message: "User loged in Successfully"
            })
 
            // res.status(200).json({
            //     success: true,
            //     token,
            //     db_result,
            //     message: "User loged in Successfully"
            // })
            

        } else {
            return res.status(404).json({
                "success": false,
                "message": "Password is Incorrect"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "success": true,
            "message": "Internal Server Error",
            "error": error
        })
    }
}

const signUpUser = async (req, res) => {
    try {
        // destructure data
        const { full_name, email, password, role } = req.body;

        // check data available
        if ( !full_name || !email || !password || !role ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Provide all Details Properlly"
            })
        }

        // check user allready exist
        const check_user = await checkUserModule(email);
        if ( check_user ) {
            return res.status(400).json({
                "success": false,
                "message": "User Allready Exist"
            })
        }

        // password hash
        const hash_password = await bcrypt.hash(password, 10);
        if (!hash_password) {
            return res.status(400).json({
                "success": false,
                "message": "Unable to password hashing"
            })
        }

        // create user entry
        const create_user_db = await signUpUserModel(full_name, email, hash_password, role);
        if (create_user_db) {
            return res.status(200).json({
                "success": false,
                "message": "User SignUp Successfully"
            })
        } else {
            return res.status(400).json({
                "success": false,
                "message": "Unable to SignUp User"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "success": true,
            "message": "Internal Server Error",
            "error": error
        })
    }
}

module.exports = { loginUser, signUpUser }; 


