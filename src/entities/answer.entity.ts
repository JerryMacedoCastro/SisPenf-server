import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAnswer } from '../interfaces/answer.entity';
import { Diagnosis } from './diagnosis.entity';
import { Option } from './option.entity';
import { Patient } from './patient.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity()
export class Answer implements IAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.answers, {
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Patient, patient => patient.answers, {
    nullable: false,
  })
  patient: Patient;

  @ManyToOne(() => Question, question => question.answers, {
    nullable: false,
  })
  @JoinColumn()
  question: Question;

  @ManyToMany(() => Option)
  @JoinTable()
  selectedOptions: Option[];

  @ManyToMany(() => Diagnosis)
  @JoinTable()
  selectedDiagnoses: Diagnosis[];

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
