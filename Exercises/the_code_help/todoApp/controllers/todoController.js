const { 
    createTodoModule, 
    updateTodoModule, 
    deleteTodoModule, 
    readTodoModule
} = require("./../models/todoModule.js");


const createTodoController = async (req, res) => {
    try {
        const { userId, title, description } = req.body;



        if ( !userId || !title || !description ) {
            return;
        }

        const create_db_entry = await createTodoModule(userId, title, description);

        // console

        if (create_db_entry === 1) {

            return res.status(200).json({
                "success": true,
                "message": "todo Created successfully"
            })

        } else {

            return res.status(404).json({
                "success": false,
                "message": "todo Not Created"
            })

        }

    } catch (error) {

        return res.status(404).json({
            "success": false,
            "message": "Internal server Error",
            "error": error
        })

    }
}

const updateTodoController = async (req, res) => {
    try {

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "message": "Internal server Error",
            "error": error
        })
    }
}

const deleteTodoController = async (req, res) => {
    try {

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "message": "Internal server Error",
            "error": error
        })
    }
}

const readTodoController = async (req, res) => {
    try {
        const result = await readTodoModule();

        if ( result !== false ) {
            return res.status(200).json({
                "success": true,
                "message": "todo app get data successfuly",
                "data": result
            })
        } else {
            return res.status(404).json({
                "success": false,
                "message": "Data NOT Available"
            })
        }

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "message": "Internal server Error",
            "error": error
        })
    }
}

module.exports = {
    createTodoController,
    updateTodoController,
    deleteTodoController,
    readTodoController
}
