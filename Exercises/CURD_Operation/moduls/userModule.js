const pool = require("./../config/databaseConnect");  

const checkUserExist = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM test_user WHERE email = $1`, 
            [email]
        );

        if (result.rows.length === 0) {
            return false;
        } else {
            return true
        }
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}
    
const createUserModel = async (email, firstName, lastName, contact, accounts, encrypted_pass, provider, country, currency) => {
    try {

        const result = await pool.query(
            `
                INSERT INTO test_user 
                    (email, firstName, lastName, contact, accounts, password, provider, country, currency)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `, 
            [email, firstName, lastName, contact, accounts, encrypted_pass, provider, country, currency]
        );

        return result.rowCount;
       
    } catch (error) {
        throw error;
    }
}

const getUserModel = async (email) => {
    try {

        const result = await pool.query(
            `SELECT * FROM test_user WHERE email = $1`, 
            [email]
        );

        if (result) {
            return result.rows
        } else {
            return false;
        }

    } catch (error) {
        console.log(error)
    }
}

const updateUserModel = async (req, res) => {
    try {

        console.log("updateUserModel");

    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

const deleteUserModel = async (req, res) => {
    try {

        console.log("deleteUserModel");

    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "request fail",
            "error": error
        });
    }
}

module.exports = {
    checkUserExist,
    createUserModel,
    getUserModel,
    updateUserModel,
    deleteUserModel
}
