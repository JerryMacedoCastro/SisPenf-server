import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Patient } from '../entities/patient.entity';
import { HospitalBed } from '../entities/hospitalBed.entity';

export default class PatientController {
  async CreatePatient(request: Request, response: Response): Promise<Response> {
    try {
      const { name, birthdate, bed } = request.body;
      const bedId = Number(bed);
      const bedRepository = getRepository(HospitalBed);
      const isExistingbed = await bedRepository.findOne(bedId);
      if (!isExistingbed)
        throw new Error('The given hospital bed does not exist');

      const patientRepository = getRepository(Patient);
      const newPatient = patientRepository.create({
        name,
        birthDate: birthdate,
        hospitalBed: isExistingbed,
        isActive: true,
      });

      patientRepository.save(newPatient);

      return response.send(newPatient);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetPatient(request: Request, response: Response): Promise<Response> {
    try {
      const patientRepository = getRepository(Patient);
      const patients = await patientRepository.find({
        relations: ['hospitalBed', 'hospitalBed.infirmary'],
      });

      return response.status(200).send(patients);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}