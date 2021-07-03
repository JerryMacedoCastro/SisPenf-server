import { IPatient } from '../interfaces/patient.interface';
import { Answer } from './answer.entity';
import { HospitalBed } from './hospitalBed.entity';
export declare class Patient implements IPatient {
    id: number;
    name: string;
    hospitalBed: HospitalBed;
    answers: Answer[];
    birthDate: Date;
    admissionDate: Date;
    isActive: boolean;
}
