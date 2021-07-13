import { Request, Response } from 'express';
export default class AnserController {
    CreateAnswer(request: Request, response: Response): Promise<Response>;
    GetAnswers(request: Request, response: Response): Promise<Response>;
    DeleteAnswers(request: Request, response: Response): Promise<Response>;
}
