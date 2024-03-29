import { Request, Response } from 'express';
import { Patient } from '../entities/patient.entity';
import AppDataSource from '../ormconfig';

export default class PatientController {
  async CreatePatient(request: Request, response: Response): Promise<Response> {
    try {
      const { id, name, birthdate, admissionDate } = request.body;
      // const bedId = Number(bed);
      // const bedRepository = AppDataSource.getRepository(HospitalBed);
      // const isExistingbed = await bedRepository.findOne({
      //   where: { id: bedId, isFilled: false },
      // });
      // if (!isExistingbed) throw new Error('The given hospital bed unavailable');

      // isExistingbed.isFilled = true;
      // await bedRepository.save(isExistingbed);
      const patientRepository = AppDataSource.getRepository(Patient);
      if (id) {
        const patienttId = Number(id);
        const updatedPatient = await patientRepository.findOne({
          where: { id: patienttId },
        });
        if (updatedPatient) {
          updatedPatient.name = name;
          updatedPatient.admissionDate = admissionDate;
          updatedPatient.birthDate = birthdate;
          const patient = await patientRepository.save(updatedPatient);
          return response.send(patient);
        } else {
          throw new Error('Patient not found');
        }
      } else {
        const newPatient = patientRepository.create({
          name,
          birthDate: birthdate,
          admissionDate: admissionDate,
          isActive: true,
        });
        const patient = await patientRepository.save(newPatient);
        return response.send(patient);
      }
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetPatient(request: Request, response: Response): Promise<Response> {
    try {
      const { patientId } = request.params;
      const patientRepository = AppDataSource.getRepository(Patient);

      const options = {
        relations: ['hospitalBed', 'hospitalBed.infirmary'],
      };

      const filteredOptions = {
        where: { id: Number(patientId) },
        relations: ['hospitalBed', 'hospitalBed.infirmary'],
      };

      const patients = await patientRepository.find(
        patientId ? filteredOptions : options,
      );

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
      const patientRepository = AppDataSource.getRepository(Patient);
      const patients = await patientRepository.delete({});

      return response.status(200).send(patients);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
