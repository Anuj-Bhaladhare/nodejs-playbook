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

const updateUserModel = async (id, firstName, lastName, contact, accounts, provider, country, currency) => {
    try {

        const db_result = await pool.query(
            `
                UPDATE test_user
                SET firstName = $1, lastName = $2, contact = $3, accounts = $4, provider = $5, country = $6, currency = $7
                WHERE id = $8;
            `,
            [firstName, lastName, contact, accounts, provider, country, currency, id]
        );

        return db_result ? db_result.rowCount : false;

    } catch (error) {
        throw error;
    }
}

const deleteUserModel = async (id) => {
    try {

        const db_result = await pool.query(
            `
                DELETE FROM test_user
                WHERE id = $1;
            `, 
            [id]
        );

        return db_result.rowCount;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkUserExist,
    createUserModel,
    getUserModel,
    updateUserModel,
    deleteUserModel
}
