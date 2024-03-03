import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column('userId')
    userId: number
    @Column({nullable: false,type:'varchar'})
    name: string
    @Column({nullable: false,type:'varchar'})
    address: string
    @Column({nullable: false,type:'varchar'})
    phone: string
    @Column({nullable: false,type:'int'})
    subTotal: number
    @Column({nullable: false,type:'int'})
    finalPrice: number
    @Column({nullable: false,type:'tinyint'})
    type: number
    @Column({nullable: false,type:'varchar'})
    codePayment: string
    @Column({nullable: true,default:1,type:'tinyint'})
    status: number
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn()
    user: User
}