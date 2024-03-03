import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import { User } from "./user.model";

export const UserInfo = sequelize.define("userInfo",{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    unique:true,
    autoIncrement:true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
},{timestamps:false})

UserInfo.belongsTo(User, {foreignKey: 'userId', onDelete:'CASCADE', onUpdate: 'CASCADE'});
User.hasOne(UserInfo, {foreignKey: 'userId'})