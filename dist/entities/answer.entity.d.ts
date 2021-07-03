import { IAnswer } from '../interfaces/answer.entity';
import { Option } from './option.entity';
import { Patient } from './patient.entity';
import { Question } from './question.entity';
import { User } from './user.entity';
export declare class Answer implements IAnswer {
    id: number;
    user: User;
    patient: Patient;
    question: Question;
    selectedOptions: Option[];
    comment: string;
    createdAt: Date;
}
