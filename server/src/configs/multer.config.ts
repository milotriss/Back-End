import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

export const multerConfig = async (): Promise<MulterOptions> => {
    return{
        storage:diskStorage({}),
        limits:{
            fileSize: 1024*1024*5,
            files: 1
        }
    }
}