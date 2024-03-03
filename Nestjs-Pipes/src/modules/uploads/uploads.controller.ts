import { Controller, Post, UploadedFile,UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { LoggingInterceptor } from 'src/interceptors/test.interceptor';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post('single')
    @UseInterceptors(FileInterceptor('key'))
    @UseInterceptors(LoggingInterceptor)
    async uploadFile(@UploadedFile() file): Promise<string>{
        return await this.uploadsService.uploadFile(file)
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('keys',10))
    @UseInterceptors(LoggingInterceptor)
    async uploadFiles(@UploadedFiles() files): Promise<string[]>{
        const uploadedFileUrl:string[] = await Promise.all(
            files.map((async (file:any)=> await this.uploadsService.uploadFile(file)))
        )
        return uploadedFileUrl
    }
}
