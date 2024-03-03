import { Body, Controller, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import { InUserLogin, InUserRegister } from '../user/dto/In.dto';
import express from 'express';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    @UseInterceptors(DurationInterceptor)
    async register(@Body() body:InUserRegister,@Res() res:express.Response){
        try {
            await this.authService.register(body);
            res.status(HttpStatus.CREATED).json({msg:'Register Success'});
        } catch (error) {
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({msg: "Error registering:Server"})
        }
    }

    @Post('login')
    @UseInterceptors(DurationInterceptor)
    async login(@Body() body:InUserLogin, @Res() res:express.Response){
        try {
            const result = await this.authService.login(body)
            if (result.msg) {
                res.status(HttpStatus.BAD_REQUEST).json(result)
            }else {
                res.status(HttpStatus.OK).json(result)
            }
        } catch (error) {
            console.log(error);
            
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({msg: "Login failed: SERVER"})
        }
    }

}
