import { Hospital } from '../entities/hospital.entity';

export interface IInfirmary {
  id: number;
  hospital: Hospital;
  description: string;
  isActive: boolean;
}
