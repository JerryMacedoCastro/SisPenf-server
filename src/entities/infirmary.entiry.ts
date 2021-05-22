import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IInfirmary } from '../interfaces/infirmary.interace';

@Entity()
export class Infirmary implements IInfirmary {
  @PrimaryGeneratedColumn()
  id: number;

  hospitalId: number;
  description: string;
  isActive: boolean;
}
