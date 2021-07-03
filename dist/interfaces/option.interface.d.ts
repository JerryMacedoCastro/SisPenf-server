import { Question } from '../entities/question.entity';
export interface IOption {
    id: number;
    description: string;
    questions: Question[];
}
