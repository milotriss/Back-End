import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UploadsModule } from '../uploads/uploads.module';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';

@Module({
  imports: [
    UploadsModule,
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({ useFactory: multerConfig }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {
  constructor() {
    cloudinaryConfig();
  }
}
