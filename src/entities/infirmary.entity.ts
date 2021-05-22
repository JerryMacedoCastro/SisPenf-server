import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IInfirmary } from '../interfaces/infirmary.interace';
import { Hospital } from './hospital.entity';

@Entity()
export class Infirmary implements IInfirmary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hospital)
  hospitalId: Hospital;

  @Column()
  description: string;

  @Column()
  isActive: boolean;
}
