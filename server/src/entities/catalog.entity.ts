import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('catalogs')
export class Catalog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, type: "varchar"})
    name: string

    @OneToMany(() => Product, (product) => product.catalog)
    products: Product[]
}