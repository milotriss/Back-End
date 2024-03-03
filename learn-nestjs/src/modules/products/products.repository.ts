import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import * as fs from 'fs'
import * as path from "path";
const Path = "../../../src/modules/products/database/product.json"
@Injectable()
export class ProductsRepository {
    getAllProducts(): any[]{
        const data = fs.readFileSync(path.join(__dirname, Path))
        return JSON.parse(data.toString())
    }
    createProduct(product:any):any[]{
        const data = fs.readFileSync(path.join(__dirname,Path))
        const products = JSON.parse(data.toString())
        products.push({...product, id: products[products.length - 1].id + 1})
        fs.writeFileSync(path.join(__dirname,Path),JSON.stringify(products))
        
        const data2 = fs.readFileSync(path.join(__dirname,Path))
        return JSON.parse(data2.toString())
    }
    updateProduct(id:number,body:any):any[]{
        const data = fs.readFileSync(path.join(__dirname,Path))
        const products = JSON.parse(data.toString())
        const newProducts = products.map((product:any)=> product.id === id ? {...product,...body} : {...product})
        fs.writeFileSync(path.join(__dirname,Path),JSON.stringify(newProducts))
        
        const data2 = fs.readFileSync(path.join(__dirname,Path))
        return JSON.parse(data2.toString())
    }
    deleteProduct(id:number):any[]{
        const data = fs.readFileSync(path.join(__dirname,Path))
        const products = JSON.parse(data.toString())
        const newProducts = products.filter((product:any)=> product.id!== id)
        fs.writeFileSync(path.join(__dirname,Path),JSON.stringify(newProducts))
        
        const data2 = fs.readFileSync(path.join(__dirname,Path))
        return JSON.parse(data2.toString())
    }
}
