

const imageUpload = async (req, res) => {
    try {

        console.log("imageUpload");

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error",
            "error": error
        })

    }
}


const videoUpload = async (req, res) => {
    try {

        console.log("imageUpload");

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error",
            "error": error
        })

    }
}


const imageReducerUpload = async (req, res) => {
    try {

        console.log("imageUpload");

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error",
            "error": error
        })

    }
}


const localFileUpload = async (req, res) => {
    try {

        const file = req.files.file;
        console.log("FILE AAGYE JEE -> ", file.name);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH => ", path);

        // save the file
        file.mv(path, (err) => {
            console.log(err);
        })

        res.status(200).json({
            "success": true,
            "message": "Local File Uploaded successfully"
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error",
            "error": error
        })

    }
}


module.exports = { imageUpload, videoUpload, imageReducerUpload, localFileUpload };
