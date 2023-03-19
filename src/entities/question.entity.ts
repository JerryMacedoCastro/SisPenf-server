import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IQuestion } from '../interfaces/question.interface';
import { Answer } from './answer.entity';
import { Diagnosis } from './diagnosis.entity';
import { Option } from './option.entity';
import { QuestionType } from './questionType.entity';

@Entity()
export class Question implements IQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuestionType, type => type.questions, {
    nullable: false,
  })
  type: QuestionType;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  allowComment: boolean;

  @OneToMany(() => Answer, answer => answer.patient)
  answers: Answer[];

  @ManyToMany(() => Option, option => option.questions)
  @JoinTable()
  options: Option[];

  @ManyToMany(() => Diagnosis, diagnosis => diagnosis.questions)
  @JoinTable()
  diagnoses: Diagnosis[];
}
