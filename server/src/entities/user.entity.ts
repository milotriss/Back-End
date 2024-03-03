import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Rate } from "./rate.entity";
import { Feedback } from "./feedback.entity";
import { OrderItem } from "./orderItem.entity";
import { Payment } from "./payment.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,type: "varchar"})
    firstName: string;
    @Column({nullable: false,type: "varchar"})
    lastName: string;
    @Column({nullable: false,unique: true,type: "varchar"})
    email: string;
    @Column({nullable: false,type: "varchar"})
    password: string;
    @Column({nullable: true, default: 'https://haycafe.vn/wp-content/uploads/2022/02/anh-meo-cute-hinh-cute-meo.jpg'})
    avatar:string;
    @Column({nullable: true, default: 'empty',type: "varchar"})
    phone: string;
    @Column({nullable: true, default: 'empty',type:"varchar"})
    address: string;
    @Column({nullable: true, default:1})
    status:number
    @Column({nullable: true, default:15})
    point: number
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Rate, (rate) => rate.user)
    rates: Rate[];

    @OneToMany(() => Feedback, (feedback) => feedback.user)
    feedbacks: Feedback[];

    @OneToMany(() => OrderItem, (product) => product.user)
    orderItems: OrderItem[];

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];
}