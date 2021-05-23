import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IHospital } from '../interfaces/hospital.interface';
import { Infirmary } from './infirmary.entity';

@Entity()
export class Hospital implements IHospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Infirmary, infirmary => infirmary.hospital)
  infirmaries: Infirmary[];

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
