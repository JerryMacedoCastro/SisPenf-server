import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from './user.dto';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;
}
