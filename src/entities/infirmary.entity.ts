import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IInfirmary } from '../interfaces/infirmary.interface';
import { Hospital } from './hospital.entity';
import { HospitalBed } from './hospitalBed.entity';

@Entity()
export class Infirmary implements IInfirmary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hospital, hospital => hospital.infirmaries, {
    nullable: false,
  })
  hospital: Hospital;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => HospitalBed, hospitalBed => hospitalBed.infirmary)
  hospitalBeds: HospitalBed[];

  @Column()
  isActive: boolean;
}
