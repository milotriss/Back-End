import { Exclude } from "class-transformer"

export class OutAllUsers {
    id:number
    firstName:string
    lastName:string
    email:string
    avatar:string
    phone:string
    address:string
    status:number
    point:number
    @Exclude()
    password:string
    @Exclude()
    createdAt:Date
}