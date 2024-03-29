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
const hospital_entity_1 = require("../entities/hospital.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class HospitalController {
    createHospital(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.body;
            try {
                const hospitalRepository = ormconfig_1.default.getRepository(hospital_entity_1.Hospital);
                const isExistingHospital = yield hospitalRepository.findOne({
                    where: {
                        name,
                    },
                });
                if (isExistingHospital)
                    throw new Error(`The hospital ${isExistingHospital.name} already exists!!`);
                const newHospital = hospitalRepository.create({
                    name,
                    isActive: true,
                });
                const res = yield hospitalRepository.save(newHospital);
                return response.status(201).send(res);
            }
            catch (error) {
                return response.status(400).send(`${error.message}`);
            }
        });
    }
    getAllHospitals(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hospitalRepository = ormconfig_1.default.getRepository(hospital_entity_1.Hospital);
                const hospitals = yield hospitalRepository.find();
                return response.status(200).send(hospitals);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = HospitalController;
