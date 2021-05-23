import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { HospitalBed } from '../entities/hospitalBed.entity';
import { Infirmary } from '../entities/infirmary.entity';
import { Hospital } from '../entities/hospital.entity';

export default class HospitalBedController {
  public async createSeveralHospitalBeds(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numberOfBeds, infirmaryId, hospitalId } = request.body;
    try {
      const quantity = Number(numberOfBeds);

      const hospitalRepository = getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne(hospitalId);

      if (!isExistingHospital) {
        throw new Error(`The given hospital does not exist!`);
      }
      const infirmaryRepository = getRepository(Infirmary);
      const isExistingInfirmary = await infirmaryRepository.findOne(
        infirmaryId,
      );

      if (!isExistingInfirmary) {
        throw new Error(`The given infirmary does not exist!`);
      }

      return response.status(201).send('not implemented');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async createHospitalBed(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { description, infirmaryId } = request.body;
    try {
      const infirmaryRepository = getRepository(Infirmary);
      const isExistingInfirmary = await infirmaryRepository.findOne(
        infirmaryId,
      );

      if (!isExistingInfirmary) {
        throw new Error(`The given infirmary does not exist!`);
      }

      const bedRepository = getRepository(HospitalBed);

      const newBed = bedRepository.create({
        description,
        infirmary: infirmaryId,
        isFilled: false,
      });

      const res = await bedRepository.save(newBed);

      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async getHospitalBeds(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const hospitalBedRepository = getRepository(HospitalBed);

      const res = await hospitalBedRepository.find({
        relations: ['infirmary'],
      });

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
