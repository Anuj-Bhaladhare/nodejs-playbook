const pool = require("./../config/database.js");

const imageUploadModule = async (file_name, file_url, file_type, email) => {
    try {

        const db_result = await pool.query(
            `
                INSERT INTO file_upload
                    (file_name, file_url, file_type, email)
                VALUES
                    ($1, $2, $3, $4)
            `,
            [file_name, file_url, file_type, email]
        )

        return db_result.rowCount === 1 ? true : false;

    } catch (error) {
        throw error;
    }
}

module.exports = { imageUploadModule };
