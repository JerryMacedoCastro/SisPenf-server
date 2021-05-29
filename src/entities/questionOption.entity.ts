import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestionOption } from '../interfaces/questionOption.interface';

@Entity()
export class QuestionOption implements IQuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;
}
