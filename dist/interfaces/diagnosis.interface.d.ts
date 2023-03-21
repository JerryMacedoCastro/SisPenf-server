import { Question } from '../entities/question.entity';
export interface IDiagnosis {
    id: number;
    description: string;
    questions: Question[];
}
