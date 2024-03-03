import { where } from "sequelize";
import User from "../entities/users.entities";
import UserRepository from "../repositories/users.repositories";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async getAllUsers(){
        return await this.userRepository.getAllUsers();
    }
    async createUser(user:any) {
        await this.userRepository.createUser(user);
    }
    async updateUser(id:number,user:any) {
        return await this.userRepository.updateUser(id,user);
    }
    async login(loginForm:any){
        try {
            const checkEmail = await this.userRepository.login(loginForm);
            if (checkEmail?.dataValues) {
                const checkPassword = bcrypt.compareSync(loginForm.password,checkEmail.dataValues.password)
                const {createdAt,updatedAt,password,...rest} = checkEmail.dataValues
                const accessToken = jwt.sign(rest,'secret')
                if (checkPassword) {
                    return {
                        user: rest,
                        accessToken
                    }
                }else 2
            }else 1
        } catch (error) {
            console.log("error");
        }
    }
}

export default UserService;