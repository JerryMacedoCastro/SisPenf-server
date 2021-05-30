import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IPatient } from '../interfaces/patient.interface';
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

  @Column({ nullable: false })
  birthDate: Date;

  @Column({ nullable: false, default: 'now()' })
  admissionDate: Date;

  @Column({ nullable: false, default: true })
  isActive: boolean;
}
