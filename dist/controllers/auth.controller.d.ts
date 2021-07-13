import { Request, Response } from 'express';
declare class AuthController {
    login(request: Request, response: Response): Promise<Response>;
    changePassword(request: Request, response: Response): Promise<Response>;
}
export default AuthController;
