import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rate } from "src/entities/rate.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RateRepository {
    constructor(
        @InjectRepository(Rate)
        private _rateDb: Repository<Rate>,
    ){}

    async createRate(form:any){
        await this._rateDb.save(form);
    }
    async getAllRates(productId:number){
        return await this._rateDb.find({
            relations:{
                user:true
            },
            where: {
                productId
            }
        });
    }
    async isActiveRate(id:number){
        await this._rateDb.update(id,{isActive:2})
    }
    async deleteRate(id:number){
        await this._rateDb.delete(id);
    }
}