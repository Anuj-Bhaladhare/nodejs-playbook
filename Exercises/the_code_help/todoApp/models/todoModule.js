const pool = require("./../config/dbConnect.js")


const createTodoModule = async ( userId, title, description ) => {
    try {

        const create_todo_db = await pool.query(
            `
                INSERT INTO tb_todo_app
                    (userId, title, description)
                VALUES
                    ($1, $2, $3)
            `, 
            [userId, title, description]
        );

        return create_todo_db.rowCount;

    } catch (error) {
        throw error;
    }
}


const updateTodoModule = async () => {
    try {

    } catch (error) {
        throw error;
    }
}


const deleteTodoModule = async () => {
    try {

    } catch (error) {
        throw error;
    }
}


const readTodoModule = async () => {
    try {
        const todo_result = await pool.query(
            `
                SELECT * FROM tb_todo_app
            `
        )

        if ( todo_result.rows.length > 0 ) {
            return todo_result.rows;
        } else {
            return false;
        }

    } catch (error) {
        throw error;
    }
}


module.exports = {
    createTodoModule,
    updateTodoModule,
    deleteTodoModule,
    readTodoModule
}
