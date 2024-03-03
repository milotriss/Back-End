import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/modules/users/users.service';
@Injectable()
export class CheckIsEmail implements NestMiddleware {
  constructor(private userService:UsersService){}
  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email
    console.log(email);
    
    const user = await this.userService.getUserByEmail(email)
    if (user) {
      next();
    }else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Not Found',
      })
    }
  }
}
