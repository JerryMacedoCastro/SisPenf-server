import { IOption } from '../interfaces/option.interface';
import { Question } from './question.entity';
export declare class Option implements IOption {
    id: number;
    description: string;
    questions: Question[];
}
