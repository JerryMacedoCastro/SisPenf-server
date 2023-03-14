import { Request, Response } from 'express';
import { HospitalBed } from '../entities/hospitalBed.entity';
import { Infirmary } from '../entities/infirmary.entity';
import { Hospital } from '../entities/hospital.entity';
import { Patient } from '../entities/patient.entity';
import AppDataSource from '../ormconfig';
export default class HospitalBedController {
  public async createSeveralHospitalBeds(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numberOfBeds, infirmaryId, hospitalId } = request.body;
    try {
      const quantity = Number(numberOfBeds);
      if (quantity <= 0) throw new Error('Invalid umber of beds');

      const hospitalRepository = AppDataSource.getRepository(Hospital);
      const isExistingHospital = await hospitalRepository.findOne({
        where: { id: Number(hospitalId) },
      });
      if (!isExistingHospital)
        throw new Error(`The given hospital does not exist!`);

      const infirmaryRepository = AppDataSource.getRepository(Infirmary);
      const isExistingInfirmary = await infirmaryRepository.findOne(
        infirmaryId,
      );
      if (!isExistingInfirmary)
        throw new Error(`The given infirmary does not exist!`);

      const bedsRepository = AppDataSource.getRepository(HospitalBed);
      const currentBeds = await bedsRepository.find({
        where: { infirmary: { id: infirmaryId } },
      });
      let initialValue = currentBeds.length;
      for (let index = 0; index < quantity; index++) {
        const newBed = bedsRepository.create({
          description: `Leito ${initialValue + 1}`,
          infirmary: infirmaryId,
          isFilled: false,
        });
        await bedsRepository.save(newBed);
        initialValue++;
      }
      const res = await bedsRepository.find({
        where: { infirmary: infirmaryId },
        relations: ['infirmary'],
      });
      return response.status(201).send(res);
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
      const infirmaryRepository = AppDataSource.getRepository(Infirmary);
      const isExistingInfirmary = await infirmaryRepository.findOne(
        infirmaryId,
      );

      if (!isExistingInfirmary) {
        throw new Error(`The given infirmary does not exist!`);
      }

      const bedRepository = AppDataSource.getRepository(HospitalBed);

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
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { infirmaryId } = request.params;
      const hospitalBedRepository = AppDataSource.getRepository(HospitalBed);
      if (infirmaryId) {
        const res = await hospitalBedRepository.find({
          relations: ['infirmary'],
          where: { infirmary: { id: Number(infirmaryId) } },
        });
        return response.status(200).send(res);
      } else {
        const res = await hospitalBedRepository.find({
          relations: ['infirmary', 'infirmary.hospital'],
        });
        return response.status(200).send(res);
      }
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async freeHospitalBed(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { bedId } = request.params;
      const hospitalBedRepository = AppDataSource.getRepository(HospitalBed);
      if (bedId) {
        const id = Number(bedId);
        const res = await hospitalBedRepository.findOne({
          where: { id },
        });

        if (res) {
          const patientRepository = AppDataSource.getRepository(Patient);
          const freePatient = await patientRepository.findOne({
            where: { hospitalBed: { id: res.id } },
          });
          res.isFilled = false;
          const updatedBed = await hospitalBedRepository.save(res);
          if (freePatient) {
            freePatient.isActive = false;
            const updatedPatient = await patientRepository.save(freePatient);

            return response
              .status(200)
              .send({ bed: updatedBed, patient: updatedPatient });
          }
          return response.status(200).send({ bed: updatedBed });
        } else {
          throw new Error('Hospital bed not found');
        }
      }
      const beds = await hospitalBedRepository.find();
      beds.forEach(bed => {
        bed.isFilled = false;
      });

      const res = await hospitalBedRepository.save(beds);
      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
