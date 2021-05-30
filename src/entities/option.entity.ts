import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IOption } from '../interfaces/option.interface';
import { Question } from './question.entity';

@Entity()
export class Option implements IOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => Question, question => question.options)
  questions: Question[];
}
