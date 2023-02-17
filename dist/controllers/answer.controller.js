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
const answer_entity_1 = require("../entities/answer.entity");
const option_entity_1 = require("../entities/option.entity");
const patient_entity_1 = require("../entities/patient.entity");
const question_entity_1 = require("../entities/question.entity");
const user_entity_1 = require("../entities/user.entity");
class AnserController {
    CreateAnswer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, patientId, questionId, options, comment } = request.body;
                const answers = options;
                const user = yield (0, typeorm_1.getRepository)(user_entity_1.User).findOne(userId);
                if (!user)
                    throw new Error('The given user does not exists!!');
                const patient = yield (0, typeorm_1.getRepository)(patient_entity_1.Patient).findOne(patientId);
                if (!patient)
                    throw new Error('The given patient does not exists!!');
                const question = yield (0, typeorm_1.getRepository)(question_entity_1.Question).findOne({
                    where: { id: questionId },
                    relations: ['options'],
                });
                if (!question)
                    throw new Error('The given question does not exists!!');
                let selectedOptions = [];
                for (let index = 0; index < answers.length; index++) {
                    const isValidAnswer = question.options.find(op => op.id === answers[index].option);
                    if (!isValidAnswer)
                        throw new Error('Invalid answer');
                    selectedOptions = [...selectedOptions, isValidAnswer];
                }
                const answerRepository = (0, typeorm_1.getRepository)(answer_entity_1.Answer);
                const isUpdateQuestion = yield answerRepository.findOne({
                    where: { patient, question },
                });
                const newAnswer = answerRepository.create({
                    id: isUpdateQuestion === null || isUpdateQuestion === void 0 ? void 0 : isUpdateQuestion.id,
                    user,
                    question,
                    patient,
                    selectedOptions,
                    comment,
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
                const userRepo = (0, typeorm_1.getRepository)(user_entity_1.User);
                const user = yield userRepo.findOne(userId);
                if (!user)
                    throw new Error('The given user does not exists!!');
                const patient = yield (0, typeorm_1.getRepository)(patient_entity_1.Patient).findOne(patientId);
                if (!patient)
                    throw new Error('The given patient does not exists!!');
                let createdAnswers = [];
                answeredQuestions.forEach((answer) => __awaiter(this, void 0, void 0, function* () {
                    const question = yield (0, typeorm_1.getRepository)(question_entity_1.Question).findOne({
                        where: { description: answer.question },
                        relations: ['options'],
                    });
                    if (!question)
                        throw new Error('The given question does not exists!!');
                    const answerRepository = (0, typeorm_1.getRepository)(answer_entity_1.Answer);
                    const isUpdateQuestion = yield answerRepository.findOne({
                        where: { patient, question },
                    });
                    let selectedOptions = [];
                    if (question.options.length > 0) {
                        console.log(answer.option);
                        const optionRepository = (0, typeorm_1.getRepository)(option_entity_1.Option);
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
    GetAnswers(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answerRepository = (0, typeorm_1.getRepository)(answer_entity_1.Answer);
                const answers = yield answerRepository.find({
                    relations: ['patient', 'question', 'selectedOptions'],
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
                const answerRepository = (0, typeorm_1.getRepository)(answer_entity_1.Answer);
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
