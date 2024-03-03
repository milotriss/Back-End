import { Injectable } from '@nestjs/common';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
    constructor(private _rateRepository: RateRepository) {}

    async createRate(userId:number,form:any){
        const newForm = {
            ...form,
            userId
        }
        await this._rateRepository.createRate(newForm)
    }
    async getAllRates(productId:number){
        return await this._rateRepository.getAllRates(productId)
    }
    async isActiveRate(id:number){
        await this._rateRepository.isActiveRate(id)
    }
    async deleteRate(id:number){
        await this._rateRepository.deleteRate(id)
    }
}
