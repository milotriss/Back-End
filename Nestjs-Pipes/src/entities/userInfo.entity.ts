import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('userInfos')
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number
    @Column({foreignKeyConstraintName:'userId'})
    userId: number
    @Column({nullable:true,default:1})
    gender: number

    @OneToOne(()=> User)
    @JoinColumn()
    user: User
}