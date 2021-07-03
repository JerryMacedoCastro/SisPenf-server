import { Request, Response } from 'express';
export default class HospitalController {
    createHospital(request: Request, response: Response): Promise<Response>;
    getAllHospitals(_request: Request, response: Response): Promise<Response>;
}
