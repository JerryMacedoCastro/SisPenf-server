import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestion } from '../interfaces/question.interface';
import { QuestionType } from './questionType.entity';

@Entity()
export class Question implements IQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: QuestionType;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  allowComment: boolean;
}
