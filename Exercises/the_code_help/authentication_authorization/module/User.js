const pool = require("./../config/pgConnect.js");

const loginUserModel = async (email) => {
    try {
        const result = await pool.query(
            `
                SELECT * FROM users WHERE email = $1
            `,
            [email]
        )

        return result.rows.length > 0 ? result.rows[0] : false;

    } catch (error) {
        throw error;
    }
}

const signUpUserModel = async (full_name, email, hash_password, role) => {
    try {
        const result = await pool.query(
            `
                INSERT INTO users
                    (full_name, email, password, role)
                VALUES
                    ($1, $2, $3, $4)
            `, 
            [full_name, email, hash_password, role]
        )

        return result.rowCount === 1 ? true : false;

    } catch (error) {
        throw error;
    }
}

const checkUserModule = async (email) => {
    try {

        const db_result = await pool.query(
            `
                SELECT * FROM users WHERE email = $1
            `,
            [email]
        );

        return db_result.rows.length > 0 ? db_result.rows : false;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    loginUserModel,
    signUpUserModel,
    checkUserModule
}
