import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Catalog } from "./catalog.entity";
import { Rate } from "./rate.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column('catalogId')
    catalogId:number
    @Column({nullable: false, type: "varchar"})
    name: string
    @Column({nullable: false, type: "varchar"})
    image:string
    @Column({nullable: false, type: "varchar"})
    descriptions: string
    @Column({nullable: false, type: "varchar"})
    ingredients: string
    @Column({nullable: false, type: "varchar"})
    allergens: string
    @Column({nullable: false, type: "int"})
    price: number
    @Column({nullable: false, type: "int"})
    stock: number
    @Column({nullable: false, type: "tinyint"})
    isDelete:number
    
    @ManyToOne(() => Catalog, (catalog) => catalog.products)
    @JoinColumn()
    catalog: Catalog

    @OneToMany(() => Rate, (rate) => rate.product)
    rates: Rate[]
}