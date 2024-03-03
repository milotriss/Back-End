import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { InCreateScoreDTO, InCreateStudentDTO } from './dto/in.dto';
import express from 'express';
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Post()
  async createStudent(
    @Body() body: InCreateStudentDTO,
    @Res() res: express.Response,
  ) {
    try {
      await this.studentService.createStudent(body);
      res
        .status(HttpStatus.CREATED)
        .json({ msg: 'Student created successfully' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error creating student: SERVER' });
    }
  }

  @Post('score/:id')
  async createScore(
    @Param() params,
    @Body() body: InCreateScoreDTO,
    @Res() res: express.Response,
  ) {
    try {
      const studentId = Number(params.id);
      await this.studentService.createScore(studentId, body);
      res
        .status(HttpStatus.CREATED)
        .json({ msg: 'Score created successfully' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error creating score: SERVER' });
    }
  }
  @Patch('score/:id')
  async updateScore(
    @Param() params,
    @Body() body: any,
    @Res() res: express.Response,
  ) {
    try {
      const id = Number(params.id);
      await this.studentService.updateScore(id, body);
      res.status(HttpStatus.OK).json({ msg: 'Score updated successfully' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error updating score: SERVER' });
    }
  }

  @Get()
  async getAllStudents(@Res() res: express.Response) {
    try {
      const result = await this.studentService.getAllStudents();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting all students: SERVER' });
    }
  }

  @Get('department/:id')
  async getAllStudentsWithDepartment(
    @Param() params,
    @Res() res: express.Response,
  ) {
    try {
      const departmentId = Number(params.id);
      const result =
        await this.studentService.getAllStudentsWithDepartment(departmentId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting all students with department: SERVER' });
    }
  }

  @Get('score/:id')
  async getStudentsWithScore(@Param() params, @Res() res: express.Response) {
    try {
      const studentId = Number(params.id);
      const result = await this.studentService.getStudentsWithScore(studentId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting all students with score: SERVER' });
    }
  }

  @Get('score/average/:id')
  async averageScore(@Param() params, @Res() res: express.Response) {
    try {
      const studentId = Number(params.id);
      const result = await this.studentService.average(studentId);
      res.status(HttpStatus.OK).json((Math.round(result * 100) / 100));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting average score: SERVER' });
    }
  }
}
