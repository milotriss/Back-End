import { Injectable } from '@nestjs/common';
import { StudentRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private studentRepository: StudentRepository) {}

  async createStudent(form: any) {
    await this.studentRepository.createStudent(form);
  }
  async createScore(studentId: number, form: any) {
    const newForm = {
      ...form,
      studentId,
    };
    await this.studentRepository.createScore(newForm);
  }
  async getAllStudents() {
    return await this.studentRepository.getAllStudents();
  }
  async getAllStudentsWithDepartment(departmentId: number) { 
    return await this.studentRepository.getAllStudentsWithDepartment(
      departmentId,
    );
  }
  async getStudentsWithScore(studentId: number) {
    return await this.studentRepository.getStudentsWithScore(
      studentId,
    );
  }
  async updateScore(id: number,body:any) {
    await this.studentRepository.updateScore(id,body);
  }
  async average(studentId:number){
    return this.studentRepository.average(studentId)
  }
}
