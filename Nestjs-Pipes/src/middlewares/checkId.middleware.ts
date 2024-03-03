import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
const Path = '../../src/modules/users/database/users.json';
@Injectable()
export class CheckId implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const users = fs.readFileSync(path.join(__dirname, Path));
    const usersData = JSON.parse(users.toString());
    const id = Number(req.params.id);
    const user = usersData.find((item: any) => item._id === id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: 'Not found',
      });
    }
  }
}
