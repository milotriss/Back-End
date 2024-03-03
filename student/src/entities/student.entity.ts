import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { Subject } from "./subject.entity";
import { Score } from "./score.entity";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number
    @Column({nullable:false})
    name: string
    @Column({nullable:false})
    birthDay: string
    @Column('departmentId')
    departmentId: number
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Department, (department) => department.students)
    @JoinColumn()
    department: Department

    @OneToMany(() => Score, (score) => score.student)
    scores: Score[]
}