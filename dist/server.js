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
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
const routes_1 = __importDefault(require("./routes"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('You need configure env vars');
        }
        yield ormconfig_1.default.initialize();
        if (ormconfig_1.default.isInitialized) {
            console.log('Database conected...');
        }
        else {
            throw new Error('AppDataSource.isInitialized returned false');
        }
    }
    catch (error) {
        console.log(`Error while connecting to the database! ${error.message}`);
    }
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/sispenf/v1', routes_1.default);
    app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT);
    });
});
start();
