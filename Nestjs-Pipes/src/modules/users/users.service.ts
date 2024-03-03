import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(form: any) {
    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(form.password, salt);
    const newForm ={
      ...form,
      password: hashedPassword
    }
    await this.userRepository.createUser(newForm);
  }
  async getAllUsers(page: number, limit: number,search: string, sort: string) {
    const offset = Math.ceil((page - 1) * limit);
    return await this.userRepository.getAllUsers(offset, limit, search, sort);
  }
  async getUser(id: number) {
    return await this.userRepository.getUser(id);
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.signIn(email);
  }
  async updateUser(id: number, user: any) {
    await this.userRepository.updateUser(id, user);
  }
  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
  }
}
