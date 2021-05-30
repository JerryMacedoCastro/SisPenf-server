import { HospitalBed } from '../entities/hospitalBed.entity';

export interface IPatient {
  id: number;
  name: string;
  hospitalBed: HospitalBed;
  birthDate: Date;
  admissionDate: Date;
  isActive: boolean;
}
