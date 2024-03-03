import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";
import { Subject } from "./subject.entity";

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @OneToMany(() => Student, (student) => student.department)
    students: Student[]

    @OneToMany(() => Subject, (subject) => subject.department)
    subjects: Subject[]
}