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
const infirmary_entity_1 = require("../entities/infirmary.entity");
const hospital_entity_1 = require("../entities/hospital.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class InfirmaryController {
    createInfirmary(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, hospitalId } = request.body;
            try {
                const hospitalRepository = ormconfig_1.default.getRepository(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne(hospitalId);
                if (!isExistingHospital) {
                    throw new Error(`The given hospital does not exist!`);
                }
                const infirmaryRepository = ormconfig_1.default.getRepository(infirmary_entity_1.Infirmary);
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
                const hospitalRepository = ormconfig_1.default.getRepository(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne(hospitalId);
                if (!isExistingHospital) {
                    throw new Error(`The given hospital does not exist!`);
                }
                const infirmaryRepository = ormconfig_1.default.getRepository(infirmary_entity_1.Infirmary);
                const currentInfirmaries = yield infirmaryRepository.find({
                    where: { hospital: { id: Number(hospitalId) } },
                });
                let initialValue = currentInfirmaries.length;
                for (let index = 0; index < quantity; index++) {
                    const newInfirmary = infirmaryRepository.create({
                        description: `Enfermaria ${initialValue + 1}`,
                        isActive: true,
                        hospital: isExistingHospital,
                    });
                    yield infirmaryRepository.save(newInfirmary);
                    initialValue++;
                }
                const res = yield infirmaryRepository.find({
                    where: { hospital: { id: hospitalId } },
                });
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
                const infirmaryRepository = ormconfig_1.default.getRepository(infirmary_entity_1.Infirmary);
                if (hospitalId) {
                    const infirmaries = yield infirmaryRepository.find({
                        where: { hospital: { id: Number(hospitalId) } },
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
