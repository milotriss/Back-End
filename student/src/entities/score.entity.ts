import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";
import { Subject } from "./subject.entity";

@Entity('scores')
export class Score {
    @PrimaryGeneratedColumn()
    id: number
    @Column({nullable:true, default:0})
    score: number
    @Column('studentId')
    studentId: number
    @Column('subjectId')
    subjectId: number

    @ManyToOne(() => Student, (student) => student.scores)
    @JoinColumn()
    student: Student

    @ManyToOne(() => Subject, (subject) => subject.scores)
    @JoinColumn()
    subject: Subject
}   