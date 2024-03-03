import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userDb: Repository<User>,
    ){}
    async getUserByEmail(email:string): Promise<any> {
        return await this.userDb.findOneBy({email})
        
    }
    async register(form:any){
        await this.userDb.save(form)
    }
    async getAllUsers(){
        return await this.userDb.find()
    }
    async updateProfile(userId:number,form:any){
        await this.userDb.update(userId,form)
    }
}