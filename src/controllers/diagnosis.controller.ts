import { Request, Response } from 'express';
import { Diagnosis } from '../entities/diagnosis.entity';
import AppDataSource from '../ormconfig';

export default class DiagnosisController {
  async CreateDiagnosis(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { description } = request.body;
      const diagnosisRepository = AppDataSource.getRepository(Diagnosis);
      const isExistingDiagnosis = await diagnosisRepository.findOne({
        where: { description },
      });

      if (isExistingDiagnosis)
        throw new Error('The given diagnosis already exists');

      const newDiagnosis = diagnosisRepository.create({ description });
      diagnosisRepository.save(newDiagnosis);

      return response.status(200).send(newDiagnosis);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetDiagnoses(_request: Request, response: Response): Promise<Response> {
    try {
      const diagnosisRepository = AppDataSource.getRepository(Diagnosis);
      const diagnoses = await diagnosisRepository.find();

      return response.status(200).send(diagnoses);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async DeleteDiagnoses(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const diagnosisRepository = AppDataSource.getRepository(Diagnosis);
      const diagnoses = await diagnosisRepository.delete({});

      return response.status(200).send(diagnoses);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
