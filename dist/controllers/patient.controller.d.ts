import { Request, Response } from 'express';
export default class PatientController {
    CreatePatient(request: Request, response: Response): Promise<Response>;
    GetPatient(request: Request, response: Response): Promise<Response>;
}
