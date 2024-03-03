import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/jwt.config';

@Module({
  imports:[UserModule,JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
