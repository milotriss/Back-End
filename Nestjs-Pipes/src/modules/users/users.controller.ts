import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { OGetAllUsersDTO } from './dto/getAllUsers/OGetUser.dto';
import { LoggingInterceptor } from 'src/interceptors/test.interceptor';
import { UsersService } from './users.service';
import { IGetUserDTO } from './dto/getUser/IGetUserDTO.dto';
import { OGetUserDTO } from './dto/getUser/OGetUserDTO.dto';
import express from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from '../uploads/uploads.service';
import { Random } from 'random-js';
import * as bcrypt from 'bcrypt';
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    // private fileService: UploadsService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('key'))
  @UseInterceptors(LoggingInterceptor)
  async create(
    @Body() body: any,
    @Res() res: express.Response,
    // @UploadedFile() file,
  ) {
    try {
      // console.log(file, 'file');
      // const result = await this.fileService.uploadFile(file);
      await this.userService.createUser(body);
      res
        .status(HttpStatus.CREATED)
        .json({ msg: 'Create success'});
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Create error: Server' });
    }
  }

  @Post('create-otp')
  @UseInterceptors(LoggingInterceptor)
  async createOtp(@Res() res: express.Response){
    try {
      const random = new Random();
      const otp = random.integer(10000, 99999);
      const salt = bcrypt.genSaltSync(9)
      const hashedOtp = bcrypt.hashSync(String(otp), salt);
      res.cookie('otp',hashedOtp,{
        expires: new Date(Date.now() + 30000000),
        httpOnly: true,
      })
      res.status(HttpStatus.CREATED).json({ msg: 'Created OTP Success',otp})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg:'Error creating otp: Server'})
    }
   
  }



  @Get()
  @UseInterceptors(LoggingInterceptor)
  async getAllUsers(@Res() res: express.Response, @Query() query: any) {
    try {
      const search = String(query.search) || '';
      const sort = String(query.sort) || '';
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 2;
      const result = await this.userService.getAllUsers(
        page,
        limit,
        search,
        sort,
      );
      const data = plainToClass(OGetAllUsersDTO, result);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Get All users error: Server' });
    }
  }

  @Get('/:id')
  @UseInterceptors(LoggingInterceptor)
  async getUser(@Param() params: IGetUserDTO, @Res() res: express.Response) {
    try {
      const id = Number(params.id);
      const result = await this.userService.getUser(id);
      const data = plainToClass(OGetUserDTO, result);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Get user error: Server' });
    }
  }

  @Patch('/:id')
  @UseInterceptors(LoggingInterceptor)
  async updateUser(
    @Param() params: IGetUserDTO,
    @Body() body: any,
    @Res() res: express.Response,
  ) {
    try {
      const id = Number(params.id);
      await this.userService.updateUser(id, body);
      res.status(HttpStatus.OK).json({ msg: 'Updated user success' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Update user error: Server' });
    }
  }

  @Delete('/:id')
  @UseInterceptors(LoggingInterceptor)
  async deleteUser(@Param() params: IGetUserDTO, @Res() res: express.Response) {
    try {
      const id = Number(params.id);
      await this.userService.deleteUser(id);
      res.status(HttpStatus.OK).json({ msg: 'Deleted user success' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Delete user error: Server' });
    }
  }
}
