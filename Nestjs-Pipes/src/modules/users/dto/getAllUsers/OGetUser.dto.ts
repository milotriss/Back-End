import { Exclude } from "class-transformer"

export class OGetAllUsersDTO {
    id:number
    name:string
    email:string
    role:string
    active:boolean
    photo:string
    
    @Exclude()
    password:string
}