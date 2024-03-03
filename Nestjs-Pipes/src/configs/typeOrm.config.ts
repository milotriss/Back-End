import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserInfo } from "src/entities/userInfo.entity";
import { config} from "dotenv"
config()
export const typeOrmConfigs:TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lamvuyvy98',
    database: 'LTORM',
    entities:[User,UserInfo],
    synchronize: false
}