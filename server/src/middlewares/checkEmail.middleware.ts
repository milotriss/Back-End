import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import express, { NextFunction } from 'express';
import { UserRepository } from 'src/modules/user/user.repository';
@Injectable()
export class CheckEmailRegister implements NestMiddleware {
  constructor(private _userRepository: UserRepository) {}
  async use(req: express.Request, res: express.Response, next: NextFunction) {
    const email = req.body.email;
    const user = await this._userRepository.getUserByEmail(email);
    if (user) {
      res.status(HttpStatus.BAD_REQUEST).json({msg:'Email has been exist'});
    } else {
      next();
    }
  }
}
@Injectable()
export class CheckIsEmail implements NestMiddleware {
  constructor(private _userRepository: UserRepository) {}
  async use(req: any, res: express.Response, next: NextFunction) {
    const email = req.body.email;
    const user = await this._userRepository.getUserByEmail(email);
    if (!user) {
      res.status(HttpStatus.BAD_REQUEST).json({msg:'Email is not exist'});
    } else {
      req.user = user;
      next();
    }
  }
}
