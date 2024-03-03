import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryConfig, multerConfig } from 'src/configs/multerCloudinary.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService]
})
export class UploadsModule {
  constructor(){cloudinaryConfig()}
}
