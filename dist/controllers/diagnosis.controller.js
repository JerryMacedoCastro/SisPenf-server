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
const diagnosis_entity_1 = require("../entities/diagnosis.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class DiagnosisController {
    CreateDiagnosis(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description } = request.body;
                const diagnosisRepository = ormconfig_1.default.getRepository(diagnosis_entity_1.Diagnosis);
                const isExistingDiagnosis = yield diagnosisRepository.findOne({
                    where: { description },
                });
                if (isExistingDiagnosis)
                    throw new Error('The given diagnosis already exists');
                const newDiagnosis = diagnosisRepository.create({ description });
                diagnosisRepository.save(newDiagnosis);
                return response.status(200).send(newDiagnosis);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetDiagnoses(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosisRepository = ormconfig_1.default.getRepository(diagnosis_entity_1.Diagnosis);
                const diagnoses = yield diagnosisRepository.find();
                return response.status(200).send(diagnoses);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    DeleteDiagnoses(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosisRepository = ormconfig_1.default.getRepository(diagnosis_entity_1.Diagnosis);
                const diagnoses = yield diagnosisRepository.delete({});
                return response.status(200).send(diagnoses);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = DiagnosisController;
