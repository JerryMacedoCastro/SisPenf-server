import { Request, Response } from 'express';
export default class QuestionOptionController {
    CreateOption(request: Request, response: Response): Promise<Response>;
    GetOptions(_request: Request, response: Response): Promise<Response>;
    DeleteOptions(_request: Request, response: Response): Promise<Response>;
}
