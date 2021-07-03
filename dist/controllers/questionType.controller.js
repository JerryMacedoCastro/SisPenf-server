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
const questionType_entity_1 = require("../entities/questionType.entity");
const typeorm_1 = require("typeorm");
class QuestionTypeControleer {
    CreateQuestionType(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { label } = request.body;
                const questionTypeRepository = typeorm_1.getRepository(questionType_entity_1.QuestionType);
                const newQuestionType = questionTypeRepository.create({
                    label,
                    isActive: true,
                });
                questionTypeRepository.save(newQuestionType);
                return response.status(200).send(newQuestionType);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetQuestionTypes(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionTypeRepository = typeorm_1.getRepository(questionType_entity_1.QuestionType);
                const res = yield questionTypeRepository.find();
                return response.status(200).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = QuestionTypeControleer;
