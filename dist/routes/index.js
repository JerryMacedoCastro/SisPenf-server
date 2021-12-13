"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospital_controller_1 = __importDefault(require("../controllers/hospital.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const infirmary_controller_1 = __importDefault(require("../controllers/infirmary.controller"));
const hospitalBed_controller_1 = __importDefault(require("../controllers/hospitalBed.controller"));
const questionType_controller_1 = __importDefault(require("../controllers/questionType.controller"));
const question_controller_1 = __importDefault(require("../controllers/question.controller"));
const option_controller_1 = __importDefault(require("../controllers/option.controller"));
const patient_controller_1 = __importDefault(require("../controllers/patient.controller"));
const answer_controller_1 = __importDefault(require("../controllers/answer.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const routes = (0, express_1.Router)();
const userController = new user_controller_1.default();
const hospitalController = new hospital_controller_1.default();
const infirmaryController = new infirmary_controller_1.default();
const hospitalBedController = new hospitalBed_controller_1.default();
const questionTypeController = new questionType_controller_1.default();
const questionController = new question_controller_1.default();
const questionOptionController = new option_controller_1.default();
const patientController = new patient_controller_1.default();
const answerController = new answer_controller_1.default();
const authController = new auth_controller_1.default();
routes.get('/', (_req, res) => {
    res.send('Hello darkness my old friend!');
});
routes.post('/user', userController.createUser);
routes.get('/user/:userId?', userController.getUsers);
routes.post('/login', authController.login);
routes.post('/change-password', [checkJwt_1.checkJwt], authController.changePassword);
routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', [checkJwt_1.checkJwt], hospitalController.getAllHospitals);
routes.post('/infirmary', infirmaryController.createInfirmary);
routes.post('/infirmaries', infirmaryController.createSeveralInfirmaries);
routes.get('/infirmary/:hospitalId?', infirmaryController.getInfirmaries);
routes.get('/hospitalbed/:infirmaryId?', hospitalBedController.getHospitalBeds);
routes.post('/hospitalbeds', hospitalBedController.createSeveralHospitalBeds);
routes.post('/hospitalbed', hospitalBedController.createHospitalBed);
routes.put('/hospitalbed/:bedId?', hospitalBedController.freeHospitalBed);
routes.post('/questiontype', questionTypeController.CreateQuestionType);
routes.get('/questiontype', questionTypeController.GetQuestionTypes);
routes.post('/question', questionController.CreateQuestion);
routes.get('/question/:questionType?', questionController.GetQuestions);
routes.get('/questionById/:id', questionController.GetQuestionById);
routes.delete('/question/:questionId', questionController.DeleteQuestionById);
routes.post('/option', questionOptionController.CreateOption);
routes.get('/option', questionOptionController.GetOptios);
routes.post('/patient', patientController.CreatePatient);
routes.get('/patient', patientController.GetPatient);
routes.delete('/patient', patientController.DeletePatients);
routes.get('/answer', answerController.GetAnswers);
routes.post('/answer', answerController.CreateAnswer);
routes.post('/answers', answerController.CreateAnswers);
routes.delete('/answer', answerController.DeleteAnswers);
exports.default = routes;
