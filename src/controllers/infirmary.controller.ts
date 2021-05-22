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
        console.log('Encontrou o hopital');
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
