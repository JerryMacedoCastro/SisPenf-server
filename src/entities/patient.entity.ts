import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IPatient } from '../interfaces/patient.interface';
import { Answer } from './answer.entity';
import { HospitalBed } from './hospitalBed.entity';

@Entity()
export class Patient implements IPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => HospitalBed)
  @JoinColumn()
  hospitalBed: HospitalBed;

  @OneToMany(() => Answer, answer => answer.patient)
  answers: Answer[];

  @Column({ nullable: false })
  birthDate: Date;

  @Column({ nullable: false })
  admissionDate: Date;

  @Column({ nullable: false, default: true })
  isActive: boolean;
}
