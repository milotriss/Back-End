import StudentRepository from "../repositories/student.repository"
import studentRepository from "../repositories/student.repository"

class StudentService {
    private studentRepository: StudentRepository
    constructor() {
        this.studentRepository = new StudentRepository()
    }

    async getAllStudents(sort:any,page:number,limit:number): Promise<any> {
        const offset = Math.ceil((page - 1) * limit)
        const data = await this.studentRepository.getAllStudents(sort,offset,limit)
        return data
    }
    async getAllStudentsReal(): Promise<any> {
        const data = await this.studentRepository.getAllStudentsReal()
        return data
    }
    async createStudent(data:any) {
        await this.studentRepository.createStudent(data)
    }
    async updateStudent(id:number,updateData:any):Promise<any> {
        const data = await this.studentRepository.updateStudent(id,updateData)
        return data
    }
    async deleteStudent(id:number):Promise<any> {
        const data = await this.studentRepository.deleteStudent(id)
        return data
    }
    async searchStudents(value:string,page:number,limit:number):Promise<any> {
        const offset = Math.ceil((page - 1) * limit)
        const data = await this.studentRepository.searchStudents(value,offset,limit)
        return data
    }
}

export default StudentService