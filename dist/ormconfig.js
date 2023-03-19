"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
const hospital_entity_1 = require("./entities/hospital.entity");
const hospitalBed_entity_1 = require("./entities/hospitalBed.entity");
const infirmary_entity_1 = require("./entities/infirmary.entity");
const patient_entity_1 = require("./entities/patient.entity");
const question_entity_1 = require("./entities/question.entity");
const questionType_entity_1 = require("./entities/questionType.entity");
const user_entity_1 = require("./entities/user.entity");
const option_entity_1 = require("./entities/option.entity");
const diagnosis_entity_1 = require("./entities/diagnosis.entity");
const AppDataSource = new typeorm_1.DataSource({
    port: 5432,
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [
        answer_entity_1.Answer,
        hospital_entity_1.Hospital,
        hospitalBed_entity_1.HospitalBed,
        infirmary_entity_1.Infirmary,
        option_entity_1.Option,
        patient_entity_1.Patient,
        question_entity_1.Question,
        questionType_entity_1.QuestionType,
        user_entity_1.User,
        diagnosis_entity_1.Diagnosis,
    ],
    migrations: ['./src/migrations/**.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
});
exports.default = AppDataSource;
