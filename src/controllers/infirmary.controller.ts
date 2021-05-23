import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Infirmary } from '../entities/infirmary.entity';
import { Hospital } from '../entities/hospital.entity';

export default class HospitalController {
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
        hospitalId,
        isActive: true,
      });
      console.log(newInfirmary);
      const res = await infirmaryRepository.save(newInfirmary);

      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async createSeveralInfirmaries(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numberOfInfirmaries, hospitalId } = request.body;
    const quantity = Number(numberOfInfirmaries);
    try {
      const hospitalRepository = getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);
      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }

      const infirmaryRepository = getRepository(Infirmary);
      const currentInfirmaries = await infirmaryRepository.find({
        hospitalId,
      });

      let initialValue = currentInfirmaries.length;
      for (let index = 0; index < quantity; index++) {
        const newInfirmary = infirmaryRepository.create({
          description: `Enfermaria ${initialValue + 1}`,
          hospitalId,
          isActive: true,
        });
        await infirmaryRepository.save(newInfirmary);
        initialValue++;
      }
      const res = await infirmaryRepository.find({ hospitalId });
      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async getAllInfirmaries(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const infirmaryRepository = getRepository(Infirmary);
      const infirmaries = await infirmaryRepository.find({
        relations: ['hospitalId'],
      });

      return response.status(200).send(infirmaries);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
