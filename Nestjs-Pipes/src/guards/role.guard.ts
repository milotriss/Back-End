import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
const Path = '../../src/modules/users/database/users.json'
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user
    if (user.role === 'admin') {
      return true
    }else{
      return false
    }
  }
}
