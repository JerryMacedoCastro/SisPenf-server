import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IHospital } from '../interfaces/hospital.interface';

@Entity()
export class Hospital implements IHospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
