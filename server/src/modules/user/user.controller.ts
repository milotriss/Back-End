import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import express from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from '../uploads/uploads.service';

@Controller('users')
export class UserController {
  constructor(
    private _userService: UserService,
    private _uploadFile: UploadsService,
  ) {}
  // Lấy về tất cả người dùng
  @Get('get-all')
  @UseInterceptors(DurationInterceptor)
  async getAllUsers(@Res() res: express.Response) {
    try {
      const result = await this._userService.getAllUsers();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting all users: SERVER' });
    }
  }

  // Tạo OTP và gởi OTP về email của người dùng
  @Post('create-otp')
  @UseInterceptors(DurationInterceptor)
  async createOtp(@Req() req, @Res() res: express.Response) {
    try {
      const user = req.user;
      const result = await this._userService.createOtp(user);
      res.cookie('otp', result, {
        expires: new Date(Date.now() + 30000000),
        httpOnly: true,
      });
      res.status(HttpStatus.CREATED).json({ msg: 'Created OTP Success' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error getting all users: SERVER' });
    }
  }

  // Xác nhận OTP
  @Post('confirm-otp')
  @UseInterceptors(DurationInterceptor)
  async confirmOtp(
    @Body() body,
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    try {
      const otpUi = body.otp;
      const otp = req.cookies.otp;
      const result = await this._userService.confirmOtp(otp, otpUi);
      res.status(HttpStatus.ACCEPTED).json(result);
    } catch (error) {
      if (error.status === 404) {
        res.status(error.status).json({ msg: error.msg });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ msg: 'Error confirm OTP: SERVER' });
      }
    }
  }

  //  Cập nhật Profile
  @Patch('update-profile/:id')
  @UseInterceptors(FileInterceptor('key'))
  @UseInterceptors(DurationInterceptor)
  async updateProfile(
    @Body() body,
    @Param() params,
    @Res() res: express.Response,
    @UploadedFile() file,
  ) {
    try {
        const userId = Number(params.id)
        const url = await this._uploadFile.uploadFile(file)
        await this._userService.updateProfile(userId,body,url)
        res.status(HttpStatus.OK).json({ msg: 'Update profile success' });
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: 'Error updating profile:SERVER'})
    }

  }
}
