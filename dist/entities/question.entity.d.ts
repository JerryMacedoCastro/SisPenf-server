import { IQuestion } from '../interfaces/question.interface';
import { Option } from './option.entity';
import { QuestionType } from './questionType.entity';
export declare class Question implements IQuestion {
    id: number;
    type: QuestionType;
    description: string;
    allowComment: boolean;
    options: Option[];
}
