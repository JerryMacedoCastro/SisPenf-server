import { Request, Response } from 'express';
export default class AnserController {
    CreateAnswer(request: Request, response: Response): Promise<Response>;
}
