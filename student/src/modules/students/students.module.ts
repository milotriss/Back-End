import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { Department } from 'src/entities/department.entity';
import { Subject } from 'src/entities/subject.entity';
import { Score } from 'src/entities/score.entity';
import { StudentRepository } from './students.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Department,Subject,Score])],
  controllers: [StudentsController],
  providers: [StudentsService,StudentRepository]
})
export class StudentsModule {}
