import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/entities/user.entity';
import { FindOptionsOrderValue, Like, Repository } from 'typeorm';
const Path = '../../../src/modules/users/database/users.json';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(form: any) {
    await this.userRepository.save(form);
  }
  async getAllUsers(
    offset: number,
    limit: number,
    search: string,
    sort: string,
  ) {
    if (search === 'undefined' && sort === 'undefined') {
      return await this.userRepository.find({
        skip: offset,
        take: limit,
      });
    }
    if (search !== 'undefined' && sort !== 'undefined') {
      return await this.userRepository.find({
        where: {
          name: Like(`${search}`),
        },
        order: {
          name: sort as FindOptionsOrderValue,
        },
        skip: offset,
        take: limit,
      });
    }
    if (sort === 'undefined' && search !== 'undefined') {
      return await this.userRepository.find({
        order: {
          name: sort as FindOptionsOrderValue,
        },
        skip: offset,
        take: limit,
      });
    }
    if (sort !== 'undefined' && search === 'undefined') {
      return await this.userRepository.find({
        where: {
          name: Like(`${search}`),
        },
        skip: offset,
        take: limit,
      });
    }
  }
  getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async updateUser(id: number, form: any) {
    await this.userRepository.update(id, form);
  }
  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
  async signIn(email: string) {
      return this.userRepository.findOneBy({ email })
  }
}
