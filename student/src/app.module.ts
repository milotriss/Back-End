import { Module } from '@nestjs/common';
import { typeOrmConfig } from './configs/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [StudentsModule,TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
