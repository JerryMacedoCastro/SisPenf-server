import { Option } from '../entities/option.entity';
import { Patient } from '../entities/patient.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';

export interface IAnswer {
  id: number;
  user: User;
  patient: Patient;
  question: Question;
  option: Option[];
  comment: string;
  createdAt: Date;
}
