// import dotenv from "dotenv";

// dotenv.config({
//     path: "./.env"
// });

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"   // Manage file system


// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // Upload the File
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // File has been uploaded
        // console.log("File is uploaded on Cloudinary", response.url);
        // fs.unlinkSync(localFilePath)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }
        return response;

    }
    catch(err){
        // console.log("Cloudinary Error:", err);
        // fs.unlinkSync(localFilePath) // Removes locally saved temporary file as upload failed
        // return null;

        console.log("Cloudinary Error:", err);

        if(localFilePath && fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }

        return null;

    }
}

export {uploadOnCloudinary}