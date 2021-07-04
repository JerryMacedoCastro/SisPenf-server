import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';
import { Answer } from './answer.entity';

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

  @OneToMany(() => Answer, answer => answer.user)
  answers: Answer[];

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
