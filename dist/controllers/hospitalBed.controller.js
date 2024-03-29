"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hospitalBed_entity_1 = require("../entities/hospitalBed.entity");
const infirmary_entity_1 = require("../entities/infirmary.entity");
const hospital_entity_1 = require("../entities/hospital.entity");
const patient_entity_1 = require("../entities/patient.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class HospitalBedController {
    createSeveralHospitalBeds(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numberOfBeds, infirmaryId, hospitalId } = request.body;
            try {
                const quantity = Number(numberOfBeds);
                if (quantity <= 0)
                    throw new Error('Invalid umber of beds');
                const hospitalRepository = ormconfig_1.default.getRepository(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne({
                    where: { id: Number(hospitalId) },
                });
                if (!isExistingHospital)
                    throw new Error(`The given hospital does not exist!`);
                const infirmaryRepository = ormconfig_1.default.getRepository(infirmary_entity_1.Infirmary);
                const isExistingInfirmary = yield infirmaryRepository.findOne(infirmaryId);
                if (!isExistingInfirmary)
                    throw new Error(`The given infirmary does not exist!`);
                const bedsRepository = ormconfig_1.default.getRepository(hospitalBed_entity_1.HospitalBed);
                const currentBeds = yield bedsRepository.find({
                    where: { infirmary: { id: infirmaryId } },
                });
                let initialValue = currentBeds.length;
                for (let index = 0; index < quantity; index++) {
                    const newBed = bedsRepository.create({
                        description: `Leito ${initialValue + 1}`,
                        infirmary: infirmaryId,
                        isFilled: false,
                    });
                    yield bedsRepository.save(newBed);
                    initialValue++;
                }
                const res = yield bedsRepository.find({
                    where: { infirmary: infirmaryId },
                    relations: ['infirmary'],
                });
                return response.status(201).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    createHospitalBed(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, infirmaryId } = request.body;
            try {
                const infirmaryRepository = ormconfig_1.default.getRepository(infirmary_entity_1.Infirmary);
                const isExistingInfirmary = yield infirmaryRepository.findOne(infirmaryId);
                if (!isExistingInfirmary) {
                    throw new Error(`The given infirmary does not exist!`);
                }
                const bedRepository = ormconfig_1.default.getRepository(hospitalBed_entity_1.HospitalBed);
                const newBed = bedRepository.create({
                    description,
                    infirmary: infirmaryId,
                    isFilled: false,
                });
                const res = yield bedRepository.save(newBed);
                return response.status(201).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    getHospitalBeds(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { infirmaryId } = request.params;
                const hospitalBedRepository = ormconfig_1.default.getRepository(hospitalBed_entity_1.HospitalBed);
                if (infirmaryId) {
                    const res = yield hospitalBedRepository.find({
                        relations: ['infirmary'],
                        where: { infirmary: { id: Number(infirmaryId) } },
                    });
                    return response.status(200).send(res);
                }
                else {
                    const res = yield hospitalBedRepository.find({
                        relations: ['infirmary', 'infirmary.hospital'],
                    });
                    return response.status(200).send(res);
                }
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    freeHospitalBed(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bedId } = request.params;
                const hospitalBedRepository = ormconfig_1.default.getRepository(hospitalBed_entity_1.HospitalBed);
                if (bedId) {
                    const id = Number(bedId);
                    const res = yield hospitalBedRepository.findOne({
                        where: { id },
                    });
                    if (res) {
                        const patientRepository = ormconfig_1.default.getRepository(patient_entity_1.Patient);
                        const freePatient = yield patientRepository.findOne({
                            where: { hospitalBed: { id: res.id } },
                        });
                        res.isFilled = false;
                        const updatedBed = yield hospitalBedRepository.save(res);
                        if (freePatient) {
                            freePatient.isActive = false;
                            const updatedPatient = yield patientRepository.save(freePatient);
                            return response
                                .status(200)
                                .send({ bed: updatedBed, patient: updatedPatient });
                        }
                        return response.status(200).send({ bed: updatedBed });
                    }
                    else {
                        throw new Error('Hospital bed not found');
                    }
                }
                const beds = yield hospitalBedRepository.find();
                beds.forEach(bed => {
                    bed.isFilled = false;
                });
                const res = yield hospitalBedRepository.save(beds);
                return response.status(200).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = HospitalBedController;
