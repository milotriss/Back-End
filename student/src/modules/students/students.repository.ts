import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Score } from "src/entities/score.entity";
import { Student } from "src/entities/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentRepository {
    constructor(
        @InjectRepository(Student)
        private studentDb: Repository<Student>,
        @InjectRepository(Score)
        private scoreDb: Repository<Score>,
    ){}
    async createStudent(form :any){
        await this.studentDb.save(form);
    }
    async createScore(form:any){
        await this.scoreDb.save(form);
    }
    async getAllStudents(){
        return await this.studentDb.find({
            relations:{
                department:{
                    subjects:true,
                },
                scores:{
                    subject:true
                },
            },
        });
    }
    async getAllStudentsWithDepartment(departmentId:number){
        return await this.studentDb.find({
            where:{departmentId},
            relations:{
                department:{
                    subjects:true,
                },
                scores:{
                    subject:true
                },
            }
        })
    }
    async getStudentsWithScore(studentId:number){
        return await this.scoreDb.find({
            where:{studentId},
            relations:{
                subject:true
            }
        })
    }
    async updateScore(id:number,body:any){
        await this.scoreDb.update(id,body)
    }
    async average(studentId:number){
        const a = await this.scoreDb.average('score',{studentId})
        return a
        
    }
}