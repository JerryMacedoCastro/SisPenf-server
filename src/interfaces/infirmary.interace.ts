import { Hospital } from '../entities/hospital.entity';

export interface IInfirmary {
  id: number;
  hospitalId: Hospital;
  description: string;
  isActive: boolean;
}
