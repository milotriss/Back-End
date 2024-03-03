import { Exclude } from "class-transformer"

export class OGetUserDTO {
    id:number
    name:string
    email:string
    role:string
    active:boolean
    photo:string
    
    @Exclude()
    password:string
}