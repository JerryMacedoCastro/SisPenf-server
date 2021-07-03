import { Request, Response } from 'express';
export default class QuestionOptionController {
    CreateOption(request: Request, response: Response): Promise<Response>;
    GetOptios(_request: Request, response: Response): Promise<Response>;
}
