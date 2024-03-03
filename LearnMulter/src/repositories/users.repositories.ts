import User from "../entities/users.entities";

class UserRepository {
    async getAllUsers(){
        return await User.findAll();
    }
    async createUser(user:any){
        await User.create(user);
    }
    async updateUser(id:number,user:any){
        return await User.update(user,{where:{id}});
    }
    async login(formLogin:any){
        return await User.findOne({where:{email:formLogin.email}});
    }
}

export default UserRepository;