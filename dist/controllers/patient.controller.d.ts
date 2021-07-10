import { Request, Response } from 'express';
export default class PatientController {
    CreatePatient(request: Request, response: Response): Promise<Response>;
    GetPatient(_request: Request, response: Response): Promise<Response>;
}
