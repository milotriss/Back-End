import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
    default:
      'https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png',
  })
  avatar: string;

  @Column({ nullable: false, default: 1 })
  role: number;
}
