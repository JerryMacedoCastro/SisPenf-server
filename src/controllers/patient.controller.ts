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
      const isExistingbed = await bedRepository.findOne({
        where: { id: bedId, isFilled: false },
      });
      if (!isExistingbed) throw new Error('The given hospital bed unavailable');

      isExistingbed.isFilled = true;
      await bedRepository.save(isExistingbed);

      const patientRepository = getRepository(Patient);
      const newPatient = patientRepository.create({
        name,
        birthDate: birthdate,
        hospitalBed: isExistingbed,
        isActive: true,
      });

      const patient = await patientRepository.save(newPatient);

      return response.send(patient);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetPatient(_request: Request, response: Response): Promise<Response> {
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

  async DeletePatients(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const patientRepository = getRepository(Patient);
      const patients = await patientRepository.delete({});

      return response.status(200).send(patients);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
