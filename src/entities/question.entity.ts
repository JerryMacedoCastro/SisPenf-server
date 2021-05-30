import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IQuestion } from '../interfaces/question.interface';
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

  @ManyToMany(() => Option, option => option.questions)
  @JoinTable()
  options: Option[];
}
