import { Request, Response } from 'express';
export default class InfirmaryController {
    createInfirmary(request: Request, response: Response): Promise<Response>;
    createSeveralInfirmaries(request: Request, response: Response): Promise<Response>;
    getInfirmaries(request: Request, response: Response): Promise<Response>;
}
