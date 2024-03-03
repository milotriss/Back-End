import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseInterceptors } from '@nestjs/common';
import { RateService } from './rate.service';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import express from 'express'
import { InCreateRate } from './dto/In.dto';

@Controller('rates')
export class RateController {
    constructor(private _rateService: RateService) {}

    // Thêm Rate theo Product
    @Post('create/:id')
    @UseInterceptors(DurationInterceptor)
    async createRate(@Body() body:InCreateRate,@Param() params,@Res() res:express.Response){
        try {
            const userId = Number(params.id)
            await this._rateService.createRate(userId,body)
            res.status(HttpStatus.CREATED).json({ msg: 'Rate created Success' });
        } catch (error) {
            console.log(error);
            
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ msg: 'Error creating rate: SERVER' });
        }
    }

    // Lấy tất cả rate
    @Get('get-all/:id')
    @UseInterceptors(DurationInterceptor)
    async getAllRates(@Res() res: express.Response, @Param() params) {
        try {
            const productId = Number(params.id)
            const result = await this._rateService.getAllRates(productId)
            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({msg: 'Error getting rates: SERVER'})
        }
    }

    // Thay đổi trạng thái của Rate
    @Patch('is-active/:id')
    @UseInterceptors(DurationInterceptor)
    async isActiveRate(@Res() res: express.Response, @Param() params) {
        try {
            const id = Number(params.id);
            await this._rateService.isActiveRate(id);
            res.status(HttpStatus.OK).json({ msg: 'Rate is active' });
        } catch (error) {
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({msg:"Error IsActive Rate: SERVER"})
        }
    }

    // Xóa rate
    @Delete('delete/:id')
    @UseInterceptors(DurationInterceptor)
    async deleteRate(@Res() res: express.Response, @Param() params) {
        try {
            const id = Number(params.id);
            await this._rateService.deleteRate(id);
            res.status(HttpStatus.OK).json({msg:"Delete Rate Success"})
        } catch (error) {
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({msg:"Error Delete Rate: SERVER"})
        }
    }
}
