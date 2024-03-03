import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './configs/typeOrm.config';
import { UploadsModule } from './modules/uploads/uploads.module';
import { AuthModule } from './modules/auth/auth.module';
import { CheckIsEmail } from './middlewares/checkEmail.middleware';

@Module({
  imports: [AuthModule,UsersModule,UploadsModule ,TypeOrmModule.forRoot(typeOrmConfigs)],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIsEmail)
      .forRoutes({path:'users/create-otp',method:RequestMethod.POST});
  }
}
