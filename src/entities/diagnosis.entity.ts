import { IDiagnosis } from '../interfaces/diagnosis.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from './question.entity';

@Entity()
export class Diagnosis implements IDiagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => Question, question => question.diagnoses)
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;
}
