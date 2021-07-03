import { Request, Response } from 'express';
export default class HospitalBedController {
    createSeveralHospitalBeds(request: Request, response: Response): Promise<Response>;
    createHospitalBed(request: Request, response: Response): Promise<Response>;
    getHospitalBeds(request: Request, response: Response): Promise<Response>;
}
