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
const question_entity_1 = require("../entities/question.entity");
const questionType_entity_1 = require("../entities/questionType.entity");
const option_entity_1 = require("../entities/option.entity");
const answer_entity_1 = require("../entities/answer.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
const diagnosis_entity_1 = require("../entities/diagnosis.entity");
const diagnosis_type_1 = require("../helpers/diagnosis-type");
class QuestionController {
    CreateQuestion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, type, allowComment, options, diagnoses } = request.body;
                const optionRepository = ormconfig_1.default.getRepository(option_entity_1.Option);
                const optionsArray = options;
                let newOptions = [];
                for (let index = 0; index < optionsArray.length; index++) {
                    const isExistingOption = yield optionRepository.findOne({
                        where: { description: optionsArray[index].description },
                    });
                    if (isExistingOption) {
                        newOptions = [...newOptions, isExistingOption];
                    }
                    else {
                        const newOption = optionRepository.create({
                            description: optionsArray[index].description,
                        });
                        const createdOption = yield optionRepository.save(newOption);
                        newOptions = [...newOptions, createdOption];
                    }
                }
                const questionRepository = ormconfig_1.default.getRepository(question_entity_1.Question);
                const isExistingDescription = yield questionRepository.findOne({
                    where: { description },
                });
                // if (isExistingDescription) {
                //   throw new Error('The given question already exist!');
                // }
                const typeRepository = ormconfig_1.default.getRepository(questionType_entity_1.QuestionType);
                const isExistingType = yield typeRepository.findOne({
                    where: { id: Number(type) },
                });
                if (!isExistingType)
                    throw new Error('The given question type does not exist!');
                const diagnosesArray = diagnoses;
                let newDiagnoses = [];
                if (isExistingType.id === diagnosis_type_1.diagnosesQuestionType.id) {
                    console.log('chegou aqui');
                    const diagnosisRepository = ormconfig_1.default.getRepository(diagnosis_entity_1.Diagnosis);
                    for (let index = 0; index < diagnosesArray.length; index++) {
                        const isExistingDiagnosis = yield diagnosisRepository.findOne({
                            where: { description: diagnosesArray[index].description },
                        });
                        if (isExistingDiagnosis) {
                            newDiagnoses = [...newDiagnoses, isExistingDiagnosis];
                        }
                        else {
                            const newDiagnosis = diagnosisRepository.create({
                                description: diagnosesArray[index].description,
                            });
                            const createdDiagnosis = yield diagnosisRepository.save(newDiagnosis);
                            newDiagnoses = [...newDiagnoses, createdDiagnosis];
                        }
                    }
                }
                const newQuestion = questionRepository.create({
                    id: isExistingDescription === null || isExistingDescription === void 0 ? void 0 : isExistingDescription.id,
                    description,
                    type,
                    allowComment,
                    options: newOptions,
                    diagnoses: newDiagnoses,
                });
                yield questionRepository.save(newQuestion);
                return response.status(200).send(newQuestion);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetQuestions(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { questionType } = request.params;
                const type = Number(questionType);
                const questionRepository = ormconfig_1.default.getRepository(question_entity_1.Question);
                let res;
                if (type) {
                    res = yield questionRepository.find({
                        where: { type: { id: type } },
                        relations: ['type', 'options', 'diagnoses'],
                    });
                }
                else {
                    res = yield questionRepository.find({
                        relations: ['type', 'options', 'diagnoses'],
                    });
                }
                return response.status(200).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetQuestionById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const questionId = Number(id);
                const questionRepository = ormconfig_1.default.getRepository(question_entity_1.Question);
                let res;
                if (questionId) {
                    res = yield questionRepository.find({
                        where: { id: questionId },
                        relations: ['type', 'options'],
                    });
                }
                return response.status(200).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    DeleteQuestionById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { questionId } = request.params;
                const id = Number(questionId);
                const questionRepository = ormconfig_1.default.getRepository(question_entity_1.Question);
                if (id) {
                    const res = yield questionRepository.findOne({ where: { id } });
                    if (res) {
                        const answerRepository = ormconfig_1.default.getRepository(answer_entity_1.Answer);
                        const asnswers = yield answerRepository.find({
                            where: { question: { id: res.id } },
                        });
                        if (asnswers) {
                            yield answerRepository.delete({
                                question: { id: res.id },
                            });
                            yield questionRepository.delete({ id: res.id });
                        }
                    }
                    return response.status(200).send(res);
                }
                else {
                    throw new Error('Question not found');
                }
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = QuestionController;
