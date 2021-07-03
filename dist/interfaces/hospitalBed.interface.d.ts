import { Infirmary } from '../entities/infirmary.entity';
export interface IHospitalBed {
    id: number;
    infirmary: Infirmary;
    description: string;
    isFilled: boolean;
}
