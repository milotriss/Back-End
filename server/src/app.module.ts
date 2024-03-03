import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { moduleImport } from './modules/index.importModule';
import { CheckEmailRegister, CheckIsEmail } from './middlewares/checkEmail.middleware';
@Module({
  imports: [...moduleImport,TypeOrmModule.forRoot(databaseConfig)],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(CheckIsEmail)
    .forRoutes({path:'auth/login',method:RequestMethod.POST})
    consumer
    .apply(CheckIsEmail)
    .forRoutes({path:'users/create-otp',method:RequestMethod.POST})
    consumer
    .apply(CheckEmailRegister)
    .forRoutes({path:'auth/register',method:RequestMethod.POST})
  }
}
