import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IHospitalBed } from '../interfaces/hospitalBed.interface';
import { Infirmary } from './infirmary.entity';

@Entity()
export class HospitalBed implements IHospitalBed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Infirmary, infirmary => infirmary.hospitalBeds)
  infirmary: Infirmary;

  @Column()
  description: string;

  @Column()
  isFilled: boolean;
}
