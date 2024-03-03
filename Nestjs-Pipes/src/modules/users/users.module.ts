import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { CheckIsEmail } from 'src/middlewares/checkEmail.middleware';
import { UserRepository } from './users.repository';
// import { CheckId } from 'src/middlewares/checkId.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UploadsModule } from '../uploads/uploads.module';
import { UploadsService } from '../uploads/uploads.service';
import {
  cloudinaryConfig,
  multerConfig,
} from 'src/configs/multerCloudinary.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UploadsModule,
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports:[UserRepository,UsersService]
})
export class UsersModule {
  constructor() {
    cloudinaryConfig();
  }
}
