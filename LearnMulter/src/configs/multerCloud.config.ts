import { CloudinaryStorage } from "multer-storage-cloudinary";
import express from 'express'
import { v2 as cloudinary}from "cloudinary";
import multer from "multer";


cloudinary.config({
    cloud_name: 'dzs3eznm7',
    api_key: '589511824834463',
    api_secret: 'owZiret_BUuJRKLgQCznlSruJAo'
})
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file:any) => {
        return { 
            folder: "avatar",
            format: "png"
        }
    }
})
const fileFilter = (req:express.Request, file:any, cb:Function) => {
    if ((file.mimetype === "image/jpeg") || (file.mimetype === "image/png") || (file.mimetype === "image/jpg")) {
        cb(null,true)
        
    }else {
        cb(new Error('File is not type jpg/jpeg/png'),false)
    }
}
const uploadCloud = multer({storage: storage, fileFilter})

export default uploadCloud