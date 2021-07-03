import { IHospitalBed } from '../interfaces/hospitalBed.interface';
import { Infirmary } from './infirmary.entity';
export declare class HospitalBed implements IHospitalBed {
    id: number;
    infirmary: Infirmary;
    description: string;
    isFilled: boolean;
}
