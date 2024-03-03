import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('orderItems')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, type: "int"})
    productId: number
    @Column('userId')
    userId: number
    @Column({nullable: false, type: "varchar"})
    image: string
    @Column({nullable: false, type: "int"})
    quantity: number
    @Column({nullable: false, type: "int"})
    price: number
    @Column({nullable: false, type: "int"})
    totalPrice: number
    @Column({nullable: false, type: "tinyint"})
    isPayment: number
    @Column({nullable: false, type: "tinyint"})
    codePayment: number

    @ManyToOne(() => User, (user) => user.orderItems)
    @JoinColumn()
    user: User
}