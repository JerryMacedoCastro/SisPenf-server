import { Infirmary } from '../entities/infirmary.entity';

export interface IHospital {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
}
