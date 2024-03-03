import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from 'src/configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UsersModule,JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
