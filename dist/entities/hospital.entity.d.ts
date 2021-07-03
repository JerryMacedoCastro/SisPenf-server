import { IHospital } from '../interfaces/hospital.interface';
import { Infirmary } from './infirmary.entity';
export declare class Hospital implements IHospital {
    id: number;
    name: string;
    infirmaries: Infirmary[];
    isActive: boolean;
    createdAt: Date;
}
