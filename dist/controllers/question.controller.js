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
const question_entity_1 = require("../entities/question.entity");
const questionType_entity_1 = require("../entities/questionType.entity");
const option_entity_1 = require("../entities/option.entity");
const answer_entity_1 = require("../entities/answer.entity");
class QuestionController {
    CreateQuestion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, type, allowComment, options } = request.body;
                const optionRepository = (0, typeorm_1.getRepository)(option_entity_1.Option);
                const optionsArray = options;
                let newOptions = [];
                for (let index = 0; index < optionsArray.length; index++) {
                    const isExistingOption = yield optionRepository.findOne({
                        description: optionsArray[index].description,
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
                const questionRepository = (0, typeorm_1.getRepository)(question_entity_1.Question);
                const isExistingDescription = yield questionRepository.findOne({
                    description: description,
                });
                // if (isExistingDescription) {
                //   throw new Error('The given question already exist!');
                // }
                const typeRepository = (0, typeorm_1.getRepository)(questionType_entity_1.QuestionType);
                const isExistingType = typeRepository.findOne(type);
                if (!isExistingType)
                    throw new Error('The given question type does not exist!');
                const newQuestion = questionRepository.create({
                    id: isExistingDescription === null || isExistingDescription === void 0 ? void 0 : isExistingDescription.id,
                    description,
                    type,
                    allowComment,
                    options: newOptions,
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
                const questionRepository = (0, typeorm_1.getRepository)(question_entity_1.Question);
                let res;
                if (type) {
                    res = yield questionRepository.find({
                        where: { type: type },
                        relations: ['type', 'options'],
                    });
                }
                else {
                    res = yield questionRepository.find({
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
    GetQuestionById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const questionId = Number(id);
                const questionRepository = (0, typeorm_1.getRepository)(question_entity_1.Question);
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
                const questionRepository = (0, typeorm_1.getRepository)(question_entity_1.Question);
                if (id) {
                    const res = yield questionRepository.findOne({ where: { id } });
                    if (res) {
                        const answerRepository = (0, typeorm_1.getRepository)(answer_entity_1.Answer);
                        const asnswers = yield answerRepository.find({
                            where: { question: res },
                        });
                        if (asnswers) {
                            yield answerRepository.delete({ question: res });
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
