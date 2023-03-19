import { IDiagnosis } from '../interfaces/diagnosis.interface';
import { Question } from './question.entity';
export declare class Diagnosis implements IDiagnosis {
    id: number;
    description: string;
    questions: Question[];
    createdAt: Date;
}
