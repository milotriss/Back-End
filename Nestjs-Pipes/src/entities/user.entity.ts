import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfo } from './userInfo.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  photo: string;

  @OneToOne(() => UserInfo, userInfo => userInfo.user,{onDelete:"CASCADE", onUpdate:"CASCADE"})
  userInfo: UserInfo

}
