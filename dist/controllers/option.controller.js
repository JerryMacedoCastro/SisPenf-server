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
const option_entity_1 = require("../entities/option.entity");
const ormconfig_1 = __importDefault(require("../ormconfig"));
class QuestionOptionController {
    CreateOption(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description } = request.body;
                const optionRepository = ormconfig_1.default.getRepository(option_entity_1.Option);
                const isExistingOption = yield optionRepository.findOne({
                    where: { description },
                });
                if (isExistingOption)
                    throw new Error('The given option already exists');
                const newOption = optionRepository.create({ description });
                optionRepository.save(newOption);
                return response.status(200).send(newOption);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    GetOptions(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionRepository = ormconfig_1.default.getRepository(option_entity_1.Option);
                const options = yield optionRepository.find();
                return response.status(200).send(options);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    DeleteOptions(_request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionRepository = ormconfig_1.default.getRepository(option_entity_1.Option);
                const options = yield optionRepository.delete({});
                return response.status(200).send(options);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = QuestionOptionController;
