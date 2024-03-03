import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class UploadsService {
  async uploadFile(file: any, nameFolder?: string): Promise<string> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path,
        {
          folder: nameFolder ?? 'images',
        },
      );
      return result.url;
    } catch (error) {
      throw new NotFoundException('File upload failed');
    }
  }
}
