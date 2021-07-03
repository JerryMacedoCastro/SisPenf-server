import { Request, Response } from 'express';
export default class QuestionController {
    CreateQuestion(request: Request, response: Response): Promise<Response>;
    GetQuestions(_request: Request, response: Response): Promise<Response>;
}
