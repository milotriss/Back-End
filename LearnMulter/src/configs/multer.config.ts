import multer from 'multer'
import express from 'express'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req:express.Request, file:any , cb:Function) => {
        const uploadFolder ='public/images';
        cb(null, uploadFolder);
    },
    filename: (req:express.Request, file:any, cb:Function) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
         cb(null, file.filename + '-' + uniqueSuffix + fileExtension);
    },
})

const upload = multer({storage: storage,limits:{fieldSize: 1024},fileFilter(req, file, callback) {
    if ((file.mimetype === "image/jpeg") || (file.mimetype === "image/png") || (file.mimetype === "image/jpg")) {
        callback(null,true)
    }else {
        callback(null,false)
    }
},});
export default upload
