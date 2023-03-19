import { Request, Response } from 'express';
export default class DiagnosisController {
    CreateDiagnosis(request: Request, response: Response): Promise<Response>;
    GetDiagnoses(_request: Request, response: Response): Promise<Response>;
    DeleteDiagnoses(_request: Request, response: Response): Promise<Response>;
}
