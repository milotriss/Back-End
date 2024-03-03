import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { OutAllUsers } from './dto/Out.dto';
import { Random } from 'random-js';
import { transporter } from 'src/configs/nodemailer.config';
@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async getAllUsers() {
    const result = await this._userRepository.getAllUsers();
    const data = plainToClass(OutAllUsers, result);
    return data;
  }
  async createOtp(user: any) {
    const random = new Random();
    const otp = random.integer(10000, 99999);
    const salt = bcrypt.genSaltSync(9);
    const hashedOtp = bcrypt.hashSync(String(otp), salt);

    await transporter.sendMail({
      bcc: user.email,
      subject: 'OTP Authentication',
      html: `
              <p>OTP: ${otp}</p>
              <p>OTP only lasts for 5 minutes, Tks!</p>
            `,
    });
    return hashedOtp;
  }
  async confirmOtp(otp: string, otpUi: string) {
    const checkOtp = bcrypt.compareSync(otpUi, otp);
    if (checkOtp) {
      return { msg: 'Confirmed OTP Success' };
    } else {
      throw { msg: 'OTP is incorrect!', status: 404 };
    }
  }
  async updateProfile(userId: number, form: any, url?: string) {
    if (url) {
      const newForm = {
        ...form,
        avatar: url,
      };
      await this._userRepository.updateProfile(userId, newForm);
    } else {
      await this._userRepository.updateProfile(userId, form);
    }
  }
}
