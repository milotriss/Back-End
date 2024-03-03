import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import {v2 as cloudinary} from "cloudinary";

export const multerConfig = async (): Promise<MulterOptions> => {
    return{
        storage:diskStorage({}),
        limits:{
            fileSize: 1024*1024*5,
            files: 10
        }
    }
}
export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: 'dzs3eznm7',
        api_key: '589511824834463',
        api_secret: 'owZiret_BUuJRKLgQCznlSruJAo'
    })
}