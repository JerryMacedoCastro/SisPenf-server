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
class QuestionController {
    CreateQuestion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, type, allowComment, options } = request.body;
                const optionRepository = typeorm_1.getRepository(option_entity_1.Option);
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
                const typeRepository = typeorm_1.getRepository(questionType_entity_1.QuestionType);
                const isExistingType = typeRepository.findOne(type);
                if (!isExistingType)
                    throw new Error('The given question type does not exist!');
                const questionRepository = typeorm_1.getRepository(question_entity_1.Question);
                const isExistingDescription = yield questionRepository.findOne({
                    description: description,
                });
                if (isExistingDescription)
                    throw new Error('The given question already exist!');
                const newQuestion = questionRepository.create({
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
    GetQuestions(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionRepository = typeorm_1.getRepository(question_entity_1.Question);
                const res = yield questionRepository.find({
                    relations: ['type', 'options'],
                });
                return response.status(200).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = QuestionController;
