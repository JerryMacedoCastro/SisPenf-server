import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Infirmary } from '../entities/infirmary.entity';
import { Hospital } from '../entities/hospital.entity';

export default class InfirmaryController {
  public async createInfirmary(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { description, hospitalId } = request.body;

    try {
      const hospitalRepository = getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);
      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }

      const infirmaryRepository = getRepository(Infirmary);
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
      const hospitalRepository = getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);
      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }

      const infirmaryRepository = getRepository(Infirmary);
      const currentInfirmaries = await infirmaryRepository.find({
        hospital: hospitalId,
      });

      let initialValue = currentInfirmaries.length;
      for (let index = 0; index < quantity; index++) {
        const newInfirmary = infirmaryRepository.create({
          description: `Enfermaria ${initialValue + 1}`,
          hospital: hospitalId,
          isActive: true,
        });
        await infirmaryRepository.save(newInfirmary);
        initialValue++;
      }
      const res = await infirmaryRepository.find({ hospital: hospitalId });
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
      const infirmaryRepository = getRepository(Infirmary);

      if (hospitalId) {
        const infirmaries = await infirmaryRepository.find({
          where: { hospital: hospitalId },
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
