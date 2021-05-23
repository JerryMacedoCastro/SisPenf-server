import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Hospital } from '../entities/hospital.entity';

export default class HospitalController {
  public async createHospital(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.body;

    try {
      const hospitalRepository = getRepository(Hospital);
      console.log(hospitalRepository);
      const isExistingHospital = await hospitalRepository.findOne({
        name: name,
      });

      if (isExistingHospital)
        throw new Error(
          `The hospital ${isExistingHospital.name} already exists!!`,
        );

      const newHospital = hospitalRepository.create({
        name,
        isActive: true,
      });
      const res = await hospitalRepository.save(newHospital);

      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async getAllHospitals(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const hospitalRepository = getRepository(Hospital);
      const hospitals = await hospitalRepository.find();

      return response.status(200).send(hospitals);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
