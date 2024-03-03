import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { Score } from "./score.entity";

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number
    @Column({nullable: false})
    name: string
    @Column('departmentId')
    departmentId: number

    @ManyToOne(() => Department, (department) => department.subjects)
    @JoinColumn()
    department: Department

    @OneToMany(() => Score,(score) => score.subject)
    scores: Score[]
}