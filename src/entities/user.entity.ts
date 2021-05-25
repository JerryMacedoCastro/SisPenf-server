import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  cpf: string;

  @Column()
  position: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
