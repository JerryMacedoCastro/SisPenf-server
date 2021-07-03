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
const patient_entity_1 = require("../entities/patient.entity");
const question_entity_1 = require("../entities/question.entity");
const user_entity_1 = require("../entities/user.entity");
class AnserController {
    CreateAnswer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, patientId, questionId, options, comment } = request.body;
                const answers = options;
                const user = yield typeorm_1.getRepository(user_entity_1.User).findOne(userId);
                if (!user)
                    throw new Error('The given user does not exists!!');
                const patient = yield typeorm_1.getRepository(patient_entity_1.Patient).findOne(patientId);
                if (!patient)
                    throw new Error('The given patient does not exists!!');
                const question = yield typeorm_1.getRepository(question_entity_1.Question).findOne({
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
                const answerRepository = typeorm_1.getRepository(answer_entity_1.Answer);
                const isUpdateQuestion = yield answerRepository.findOne({
                    where: {
                        patient,
                        question,
                    },
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
}
exports.default = AnserController;
