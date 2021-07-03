import { Request, Response } from 'express';
export default class UserController {
    createUser(request: Request, response: Response): Promise<Response>;
    getUsers(request: Request, response: Response): Promise<Response>;
}
