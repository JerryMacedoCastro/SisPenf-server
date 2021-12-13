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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const infirmary_entity_1 = require("../entities/infirmary.entity");
const hospital_entity_1 = require("../entities/hospital.entity");
class InfirmaryController {
    createInfirmary(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, hospitalId } = request.body;
            try {
                const hospitalRepository = (0, typeorm_1.getRepository)(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne(hospitalId);
                if (!isExistingHospital) {
                    throw new Error(`The given hospital does not exist!`);
                }
                const infirmaryRepository = (0, typeorm_1.getRepository)(infirmary_entity_1.Infirmary);
                const newInfirmary = infirmaryRepository.create({
                    description,
                    hospital: hospitalId,
                    isActive: true,
                });
                const res = yield infirmaryRepository.save(newInfirmary);
                const json = JSON.stringify(res);
                return response.status(201).json(json);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    createSeveralInfirmaries(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numberOfInfirmaries, hospitalId } = request.body;
            try {
                const quantity = Number(numberOfInfirmaries);
                const hospitalRepository = (0, typeorm_1.getRepository)(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne(hospitalId);
                if (!isExistingHospital) {
                    throw new Error(`The given hospital does not exist!`);
                }
                const infirmaryRepository = (0, typeorm_1.getRepository)(infirmary_entity_1.Infirmary);
                const currentInfirmaries = yield infirmaryRepository.find({
                    hospital: hospitalId,
                });
                let initialValue = currentInfirmaries.length;
                for (let index = 0; index < quantity; index++) {
                    const newInfirmary = infirmaryRepository.create({
                        description: `Enfermaria ${initialValue + 1}`,
                        hospital: hospitalId,
                        isActive: true,
                    });
                    yield infirmaryRepository.save(newInfirmary);
                    initialValue++;
                }
                const res = yield infirmaryRepository.find({ hospital: hospitalId });
                return response.status(201).json(res);
            }
            catch (error) {
                return response.status(400).json(error.message);
            }
        });
    }
    getInfirmaries(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { hospitalId } = request.params;
                const infirmaryRepository = (0, typeorm_1.getRepository)(infirmary_entity_1.Infirmary);
                if (hospitalId) {
                    const infirmaries = yield infirmaryRepository.find({
                        where: { hospital: hospitalId },
                        relations: ['hospital'],
                    });
                    return response.status(200).json(infirmaries);
                }
                else {
                    const infirmaries = yield infirmaryRepository.find({
                        relations: ['hospital'],
                    });
                    const json = JSON.stringify(infirmaries);
                    return response.status(200).send(json);
                }
            }
            catch (error) {
                return response.status(400).json(error.message);
            }
        });
    }
}
exports.default = InfirmaryController;
