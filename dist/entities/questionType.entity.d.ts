import { IQuestionType } from '../interfaces/questionType.interface';
import { Question } from './question.entity';
export declare class QuestionType implements IQuestionType {
    id: number;
    label: string;
    isActive: boolean;
    questions: Question[];
}
