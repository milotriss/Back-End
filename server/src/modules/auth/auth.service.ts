import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _jwtService: JwtService,
  ) {}

  async register(form:any){
    const pass = form.password
    const salt = bcrypt.genSaltSync(9)
    const hashedPass = bcrypt.hashSync(pass, salt)
    const newForm = {
        ...form,
        password: hashedPass
    }
    await this._userRepository.register(newForm);
}
  async login(body: any) {
    const result = await this._userRepository.getUserByEmail(body.email);
    const checkPass = bcrypt.compareSync(body.password, result.password);
    if (!checkPass) {
      return { msg: 'Password incorrect!' };
    } else {
      const {
        password,
        createdAt,
        firstName,
        lastName,
        email,
        avatar,
        phone,
        address,
        ...rest
      } = result;
      const accessToken = await this._jwtService.signAsync(rest);
      return {msg:'Login Success',accessToken,data:result};
    }
  }
}
