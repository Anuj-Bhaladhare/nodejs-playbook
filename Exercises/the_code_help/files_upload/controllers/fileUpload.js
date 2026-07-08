
const { imageUploadModule } = require("./../models/File.js");

const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {

    const options = {folder};

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}


const imageUpload = async (req, res) => {
    try{
        //data fetch
        const { file_name, file_type, email} = req.body;
        console.log(file_name, file_type, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to file_upload");
        const response = await uploadFileToCloudinary(file, "file_upload");
        console.log(response);

        //db me entry save krni h
        const db_result = await imageUploadModule(
            file_name, 
            response.secure_url, 
            file_type, 
            email
        );
        
        if (db_result) {
            return res.status(200).json({
                "success": true,
                "imageUrl": response.secure_url,
                "message": 'Image Successfully Uploaded',
            });
        } else {
            res.status(400).json({
                "success": false,
                "message": 'Image Not Uploaded',
            });
        }

    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}


const videoUpload = async (req, res) => {
    try {

        const { file_name, file_type, email } = req.body;
        const video_file = req.files.videoFile;

        console.log(file_name, file_type, email, video_file?.name);

        if ( !file_name || !file_type || !email || !video_file?.name) {
            return res.status(400).json({
                "success": false,
                "message": "Data is Missing | provide all the details properlly"
            });
        }

        let vid_supported_type = ['webm', 'mpg', 'mp4', 'ogg', 'avi', 'mov', 'flv'];
        let type = video_file.name.split(".").pop();

        if ( !isFileTypeSupported(type, vid_supported_type) ) {
            return res.status(400).json({
                "success": false,
                "message": "File Type is NOT Supported"
            });
        }

        // upload the video
        const response = await uploadFileToCloudinary(video_file, "file_upload");

        console.log("responce ===> ", response.secure_url);

        if ( response ) {

            const db_response = await imageUploadModule(
                file_name, 
                response.secure_url, 
                file_type, 
                email
            ) 

            if ( db_response ) {

                return res.status(200).json({
                    "success": true,
                    "message": "Video Uploaded Successfully",
                    "response": response
                });

            } else {

                return res.status(400).json({
                    "success": false,
                    "message": "Video NOT Uploaded"
                });

            }
        } 

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

        // fetch file from request
        const file = req.files.file;
        console.log("FILE AAGYE JEE -> ", file.name);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH => ", path);

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        })

        // create a successful responce
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







