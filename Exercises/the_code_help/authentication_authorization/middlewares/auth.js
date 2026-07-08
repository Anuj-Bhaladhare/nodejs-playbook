const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {

        // console.log("cookie", req.cookies.token);
        // console.log("body", req.body.token);      // Bad Practice to send token in Body 
        // console.log("header", req.header("Authorization"));

        const token = req.cookies.token

        if ( !token ) {
            return res.status(404).json({
                "success": false,
                "message": "jwt token is Not available"
            })
        }
        
        // verify the token
        try {
            const decode_token = jwt.verify( token, process.env.JWT_SECRETE );
            console.log(decode_token);

            req.user = decode_token;

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                "success": false,
                "message": "jwt token is Invalid"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            "success": false,
            "message": "Something went Wrong"
        })
    }
}

const isStudent = async (req, res, next) => {
    try {

        if ( req.user.role !== "Student" ) {
            return res.status(401).json({
                "success": false,
                "message": "User Not Allow, this is the protected route for the Student"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            "success": false,
            "message": "Something went Wrong"
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {

        if ( req.user.role !== "Admin" ) {
            return res.status(401).json({
                "success": false,
                "message": "User Not Allow, this is the protected route for the Admin"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            "success": false,
            "message": "Something went Wrong"
        })
    }
}

module.exports = {
    auth,
    isStudent,
    isAdmin
};
  