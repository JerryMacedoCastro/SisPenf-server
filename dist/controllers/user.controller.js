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
const user_entity_1 = require("../entities/user.entity");
class UserController {
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, cpf, position, password } = request.body;
            try {
                const userRepository = typeorm_1.getRepository(user_entity_1.User);
                const isExistingUser = yield userRepository.findOne({ email: email });
                if (isExistingUser)
                    throw new Error(`The email ${isExistingUser.email} already exists!!`);
                const user = userRepository.create({
                    name,
                    email,
                    cpf,
                    position,
                    password,
                    isActive: false,
                });
                user.hashPassword();
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
                    const user = yield userRepository.findOne(userId, {
                        select: ['id', 'email', 'name', 'position'],
                    });
                    if (user)
                        return response.status(200).send(user);
                    throw new Error('User not found');
                }
                const allUsers = yield userRepository.find({
                // select: ['id', 'email', 'name', 'position'],
                });
                return response.status(200).send(allUsers);
            }
            catch (error) {
                return response.status(400).send(error.message);
            }
        });
    }
}
exports.default = UserController;
