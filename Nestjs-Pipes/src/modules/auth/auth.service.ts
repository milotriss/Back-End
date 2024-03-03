import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(body: any) {
    const result = await this.userRepository.signIn(body.email);
    if (result === null) {
      return 'email invalid';
    } else {
      console.log(body.password);
      const checkPass = bcrypt.compareSync(body.password,result.password);
      if (checkPass) {
        const { password, name, email, photo, userInfo, ...rest } = result;
        const accessToken = await this.jwtService.signAsync(rest);
        return accessToken;
      } else {
        return 'password incorrect';
      }
    }
  }
}
