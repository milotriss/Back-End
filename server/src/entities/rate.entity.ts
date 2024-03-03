import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity('rates')
export class Rate {
    @PrimaryGeneratedColumn()
    id: number

    @Column('userId')
    userId: number
    @Column('productId')
    productId: number
    @Column({nullable: false,type:'tinyint'})
    rateStar: number
    @Column({nullable: false,type:'varchar'})
    content: string
    @Column({nullable: true,default:1,type:'tinyint'})
    isActive: number
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Product, (product) => product.rates)
    @JoinColumn()
    product: Product

    @ManyToOne(() => User, (user) => user.rates)
    @JoinColumn()
    user: User
}