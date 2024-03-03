import { Op } from "sequelize";
import Student from "../models/student.model";

class StudentRepository {
  async getAllStudentsReal(): Promise<any> {
    return await Student.findAll()
  }
  async getAllStudents(sort: any,offset:number,limit:number): Promise<any> {
    if (sort) {
      return await Student.findAll({
        order: [["gender", sort]],
        offset,
        limit
      })
    } else {
      return await Student.findAll({
        offset,
        limit
      });
    }
  }
  async createStudent(data: any) {
    await Student.create(data);
  }
  async updateStudent(id: number, data: any) {
    return await Student.update(data, { where: { id } });
  }
  async deleteStudent(id: number) {
    return await Student.destroy({ where: { id } });
  }
  async searchStudents(value: string, offset: number, limit: number): Promise<any> {
    return await Student.findAll({
      where: {
        [Op.or]: [
          { lastName: { [Op.like]: `%${value}%` } },
          { firstName: { [Op.like]: `%${value}%` } },
        ],
      },
      offset,
      limit,
    });
  }
}

export default StudentRepository;
