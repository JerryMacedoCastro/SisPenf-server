import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestionType } from '../interfaces/questionType.interface';
import { Question } from './question.entity';

@Entity()
export class QuestionType implements IQuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  label: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => Question, question => question.type)
  questions: Question[];
}
