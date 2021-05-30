import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAnswer } from '../interfaces/answer.entity';
import { Option } from './option.entity';
import { Patient } from './patient.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity()
export class Answer implements IAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Patient, {
    nullable: false,
  })
  @JoinColumn()
  patient: Patient;

  @OneToOne(() => Question, {
    nullable: false,
  })
  @JoinColumn()
  question: Question;

  @ManyToMany(() => Option)
  @JoinColumn()
  option: Option[];

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
