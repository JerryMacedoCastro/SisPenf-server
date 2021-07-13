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
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
class AuthController {
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if username and password are set
            const { email, password } = request.body;
            if (!(email && password)) {
                response.status(400).send();
            }
            // Get user from database
            const userRepository = typeorm_1.getRepository(user_entity_1.User);
            let user;
            try {
                user = yield userRepository.findOneOrFail({ where: { email } });
            }
            catch (error) {
                return response.status(401).send({ error: error.message });
            }
            // Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                return response.status(401).send({ error: 'wrong e-mail or password ' });
            }
            const jwtSecret = process.env.SECRET ? process.env.SECRET : '';
            // Sing JWT, valid for 1 hour
            const token = jwt.sign({ userId: user.id, username: user.email }, jwtSecret, { expiresIn: '1h' });
            // Send the jwt in the response
            return response.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            });
        });
    }
    changePassword(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get ID from JWT
            const id = response.locals.jwtPayload.userId;
            // Get parameters from the body
            const { oldPassword, newPassword } = request.body;
            if (!(oldPassword && newPassword)) {
                return response.status(400).send({ error: 'No parameters' });
            }
            // Get user from the database
            const userRepository = typeorm_1.getRepository(user_entity_1.User);
            let user;
            try {
                user = yield userRepository.findOneOrFail(id);
            }
            catch (id) {
                return response.status(401).send();
            }
            // Check if old password matchs
            if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
                return response.status(401).send();
            }
            user.password = newPassword;
            // Hash the new password and save
            user.hashPassword();
            userRepository.save(user);
            return response.status(204).send();
        });
    }
}
exports.default = AuthController;
