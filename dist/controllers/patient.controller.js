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
const patient_entity_1 = require("../entities/patient.entity");
const hospitalBed_entity_1 = require("../entities/hospitalBed.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class PatientController {
    CreatePatient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, birthdate, admissionDate, bed } = request.body;
                const bedId = Number(bed);
                const bedRepository = ormconfig_1.default.getRepository(hospitalBed_entity_1.HospitalBed);
                const isExistingbed = yield bedRepository.findOne({
                    where: { id: bedId, isFilled: false },
                });
                if (!isExistingbed)
                    throw new Error('The given hospital bed unavailable');
                isExistingbed.isFilled = true;
                yield bedRepository.save(isExistingbed);
                const patientRepository = ormconfig_1.default.getRepository(patient_entity_1.Patient);
                const newPatient = patientRepository.create({
                    name,
                    birthDate: birthdate,
                    hospitalBed: isExistingbed,
                    admissionDate: admissionDate,
                    isActive: true,
                });
                const patient = yield patientRepository.save(newPatient);
                return response.send(patient);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetPatient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = request.params;
                const patientRepository = ormconfig_1.default.getRepository(patient_entity_1.Patient);
                const options = {
                    relations: ['hospitalBed', 'hospitalBed.infirmary'],
                };
                const filteredOptions = {
                    where: { id: Number(patientId) },
                    relations: ['hospitalBed', 'hospitalBed.infirmary'],
                };
                const patients = yield patientRepository.find(patientId ? filteredOptions : options);
                return response.status(200).send(patients);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    DeletePatients(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRepository = ormconfig_1.default.getRepository(patient_entity_1.Patient);
                const patients = yield patientRepository.delete({});
                return response.status(200).send(patients);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = PatientController;
