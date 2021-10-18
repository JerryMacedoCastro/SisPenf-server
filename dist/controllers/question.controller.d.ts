import { Request, Response } from 'express';
export default class QuestionController {
    CreateQuestion(request: Request, response: Response): Promise<Response>;
    GetQuestions(request: Request, response: Response): Promise<Response>;
    DeleteQuestionById(request: Request, response: Response): Promise<Response>;
}
