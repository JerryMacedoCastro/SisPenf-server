import { IInfirmary } from '../interfaces/infirmary.interface';
import { Hospital } from './hospital.entity';
import { HospitalBed } from './hospitalBed.entity';
export declare class Infirmary implements IInfirmary {
    id: number;
    hospital: Hospital;
    description: string;
    hospitalBeds: HospitalBed[];
    isActive: boolean;
}
