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
const answer_entity_1 = require("../entities/answer.entity");
const option_entity_1 = require("../entities/option.entity");
const patient_entity_1 = require("../entities/patient.entity");
const question_entity_1 = require("../entities/question.entity");
const user_entity_1 = require("../entities/user.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
const diagnosis_type_1 = require("../helpers/diagnosis-type");
class AnserController {
    CreateAnswer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, patientId, questionId, options, comment, diagnoses } = request.body;
                const optionsArray = options;
                const diagnosesArray = diagnoses;
                const user = yield ormconfig_1.default.getRepository(user_entity_1.User).findOne({
                    where: { id: Number(userId) },
                });
                if (!user)
                    throw new Error('The given user does not exists!!');
                const patient = yield ormconfig_1.default.getRepository(patient_entity_1.Patient).findOne({
                    where: { id: Number(patientId) },
                });
                if (!patient)
                    throw new Error('The given patient does not exists!!');
                const question = yield ormconfig_1.default.getRepository(question_entity_1.Question).findOne({
                    where: { id: Number(questionId) },
                    relations: ['options', 'type', 'diagnoses'],
                });
                if (!question)
                    throw new Error('The given question does not exists!!');
                let selectedOptions = [];
                for (let index = 0; index < optionsArray.length; index++) {
                    const isValidOption = question.options.find(option => {
                        return option.description === optionsArray[index].description;
                    });
                    if (!isValidOption)
                        throw new Error('Invalid option');
                    selectedOptions = [...selectedOptions, isValidOption];
                }
                let selectedDiagnoses = [];
                if (question.type.id === diagnosis_type_1.diagnosesQuestionType.id) {
                    for (let index = 0; index < diagnosesArray.length; index++) {
                        const isValidDiagnosis = question.diagnoses.find(diagnosis => diagnosis.description === diagnosesArray[index].description);
                        if (!isValidDiagnosis)
                            throw new Error('Invalid diagnosis');
                        selectedDiagnoses = [...selectedDiagnoses, isValidDiagnosis];
                    }
                }
                const answerRepository = ormconfig_1.default.getRepository(answer_entity_1.Answer);
                const isUpdateQuestion = yield answerRepository.findOne({
                    where: { patient: { id: patient.id }, question: { id: question.id } },
                });
                const newAnswer = answerRepository.create({
                    id: isUpdateQuestion === null || isUpdateQuestion === void 0 ? void 0 : isUpdateQuestion.id,
                    user,
                    question,
                    patient,
                    selectedOptions,
                    comment,
                    selectedDiagnoses,
                });
                const createdAnswer = yield answerRepository.save(newAnswer);
                return response.status(200).send(createdAnswer);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    CreateAnswers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, patientId, questions } = request.body;
                const answeredQuestions = questions;
                if (!questions.length || answeredQuestions.length === 0)
                    throw new Error('No answers were given!!');
                const userRepo = ormconfig_1.default.getRepository(user_entity_1.User);
                const user = yield userRepo.findOne(userId);
                if (!user)
                    throw new Error('The given user does not exists!!');
                const patient = yield ormconfig_1.default.getRepository(patient_entity_1.Patient).findOne({
                    where: { id: Number(patientId) },
                });
                if (!patient)
                    throw new Error('The given patient does not exists!!');
                let createdAnswers = [];
                answeredQuestions.forEach((answer) => __awaiter(this, void 0, void 0, function* () {
                    const question = yield ormconfig_1.default.getRepository(question_entity_1.Question).findOne({
                        where: { description: answer.question },
                        relations: ['options'],
                    });
                    if (!question)
                        throw new Error('The given question does not exists!!');
                    const answerRepository = ormconfig_1.default.getRepository(answer_entity_1.Answer);
                    const isUpdateQuestion = yield answerRepository.findOne({
                        where: { patient: { id: patient.id }, question: { id: question.id } },
                    });
                    let selectedOptions = [];
                    if (question.options.length > 0) {
                        console.log(answer.option);
                        const optionRepository = ormconfig_1.default.getRepository(option_entity_1.Option);
                        const selectedOption = yield optionRepository.findOne({
                            where: { description: answer.option },
                        });
                        if (!selectedOption)
                            throw new Error('Invalid option');
                        selectedOptions = [selectedOption];
                    }
                    const newAnswer = answerRepository.create({
                        id: isUpdateQuestion === null || isUpdateQuestion === void 0 ? void 0 : isUpdateQuestion.id,
                        user,
                        comment: answer.comment || '',
                        question,
                        patient,
                        selectedOptions,
                    });
                    const createdAnswer = yield answerRepository.save(newAnswer);
                    createdAnswers = [...createdAnswers, createdAnswer];
                }));
                return response
                    .status(200)
                    .send({ Message: 'All answers created or updated!' });
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetAnswers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId, questionType } = request.params;
                const answerRepository = ormconfig_1.default.getRepository(answer_entity_1.Answer);
                if (patientId && questionType) {
                    const id = Number(patientId);
                    const type = Number(questionType);
                    const answers = yield answerRepository.find({
                        where: { id, question: { type: { id: type } } },
                        relations: [
                            'patient',
                            'question',
                            'selectedOptions',
                            'selectedDiagnoses',
                        ],
                    });
                    return response.status(200).json(answers);
                }
                const answers = yield answerRepository.find({
                    relations: [
                        'patient',
                        'question',
                        'selectedOptions',
                        'selectedDiagnoses',
                    ],
                });
                return response.status(200).json(answers);
            }
            catch (error) {
                return response.status(400).json(error.message);
            }
        });
    }
    DeleteAnswers(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answerRepository = ormconfig_1.default.getRepository(answer_entity_1.Answer);
                const answers = yield answerRepository.delete({});
                return response.status(200).json(answers);
            }
            catch (error) {
                return response.status(400).json(error.message);
            }
        });
    }
}
exports.default = AnserController;
