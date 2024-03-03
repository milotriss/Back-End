import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('LS', 'root', 'lamvuyvy98',{
    host: 'localhost',
    dialect:'mysql'
})
export default sequelize;