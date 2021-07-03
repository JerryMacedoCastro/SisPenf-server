import { Request, Response } from 'express';
export default class QuestionTypeControleer {
    CreateQuestionType(request: Request, response: Response): Promise<Response>;
    GetQuestionTypes(_request: Request, response: Response): Promise<Response>;
}
