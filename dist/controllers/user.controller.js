"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_entity_1 = require("../entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
class UserController {
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, cpf, position, password } = request.body;
            try {
                const userRepository = typeorm_1.getRepository(user_entity_1.User);
                const isExistingUser = yield userRepository.findOne({ email: email });
                if (isExistingUser)
                    throw new Error(`The email ${isExistingUser.email} already exists!!`);
                const hashedPassword = yield bcrypt.hash(password, 10);
                const user = userRepository.create({
                    name,
                    email,
                    cpf,
                    position,
                    password: hashedPassword,
                    isActive: false,
                });
                const res = yield userRepository.save(user);
                return response.status(201).send(res);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
    getUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const userRepository = typeorm_1.getRepository(user_entity_1.User);
                if (userId) {
                    const user = yield userRepository.findOne(userId);
                    if (user)
                        return response.status(200).send(user);
                    throw new Error('User not found');
                }
                const allUsers = yield userRepository.find();
                return response.status(200).send(allUsers);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = UserController;
