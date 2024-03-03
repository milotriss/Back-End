import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('feedbacks')
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number

    @Column('userId')
    userId:number
    @Column({nullable: false, type: 'varchar'})
    content: string
    @Column({nullable: false, type: 'tinyint'})
    emotion: number
    @Column({nullable: false,default:1 ,type: 'tinyint'})
    isActive: number
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.feedbacks)
    @JoinColumn()
    user: User
}