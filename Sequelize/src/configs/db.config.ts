import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config()


const sequelize = new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASS), {
    host: String(process.env.DB_HOST),
    dialect: 'mysql'
  });


export default sequelize