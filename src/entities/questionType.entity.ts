import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestionType } from '../interfaces/questionType.interface';

@Entity()
export class QuestionType implements IQuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  label: string;

  @Column()
  isActive: boolean;
}
