import { QuestionType } from '../entities/questionType.entity';

export interface IQuestion {
  id: number;
  description: string;
  type: QuestionType;
  allowComment: boolean;
}
