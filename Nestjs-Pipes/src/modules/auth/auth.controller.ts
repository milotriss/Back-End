import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() body: any, @Res() res: express.Response) {
    try {
      const result = await this.authService.signIn(body);
      if (result === 'email invalid') {
        res.status(HttpStatus.NOT_FOUND).json({ msg: result });
      } else if (result === 'password incorrect') {
        res.status(HttpStatus.BAD_REQUEST).json({ msg: result });
      } else {
        res.status(HttpStatus.OK).json({ msg: 'Login Success' , accessToken:result});
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error signing in:server' });
    }
  }
}
