import { Request, Response } from 'express';
import { Infirmary } from '../entities/infirmary.entity';
import { Hospital } from '../entities/hospital.entity';
import AppDataSource from '../ormconfig';

export default class InfirmaryController {
  public async createInfirmary(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { description, hospitalId } = request.body;

    try {
      const hospitalRepository = AppDataSource.getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);
      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }

      const infirmaryRepository = AppDataSource.getRepository(Infirmary);
      const newInfirmary = infirmaryRepository.create({
        description,
        hospital: hospitalId,
        isActive: true,
      });
      const res = await infirmaryRepository.save(newInfirmary);
      const json = JSON.stringify(res);
      return response.status(201).json(json);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async createSeveralInfirmaries(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numberOfInfirmaries, hospitalId } = request.body;
    try {
      const quantity = Number(numberOfInfirmaries);
      const hospitalRepository = AppDataSource.getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);
      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }

      const infirmaryRepository = AppDataSource.getRepository(Infirmary);
      const currentInfirmaries = await infirmaryRepository.find({
        where: { hospital: { id: Number(hospitalId) } },
      });

      let initialValue = currentInfirmaries.length;
      for (let index = 0; index < quantity; index++) {
        const newInfirmary = infirmaryRepository.create({
          description: `Enfermaria ${initialValue + 1}`,
          isActive: true,
          hospital: isExistingHospital,
        });
        await infirmaryRepository.save(newInfirmary);
        initialValue++;
      }
      const res = await infirmaryRepository.find({
        where: { hospital: { id: hospitalId } },
      });
      return response.status(201).json(res);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  public async getInfirmaries(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { hospitalId } = request.params;
      const infirmaryRepository = AppDataSource.getRepository(Infirmary);

      if (hospitalId) {
        const infirmaries = await infirmaryRepository.find({
          where: { hospital: { id: Number(hospitalId) } },
          relations: ['hospital'],
        });
        return response.status(200).json(infirmaries);
      } else {
        const infirmaries = await infirmaryRepository.find({
          relations: ['hospital'],
        });
        const json = JSON.stringify(infirmaries);
        return response.status(200).send(json);
      }
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
