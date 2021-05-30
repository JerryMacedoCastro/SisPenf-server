import { Option } from '../entities/option.entity';
import { QuestionType } from '../entities/questionType.entity';

export interface IQuestion {
  id: number;
  description: string;
  type: QuestionType;
  allowComment: boolean;
  options: Option[];
}
