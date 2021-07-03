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
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
const routes_1 = __importDefault(require("./routes"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection(ormconfig_1.default);
    }
    catch (error) {
        console.log(`Error while connecting to the database! ${error.message}`);
    }
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use('/sispenf/v1', routes_1.default);
    app.listen(process.env.PORT || 3333, () => {
        console.log('Listening on port 3333');
    });
});
start();
