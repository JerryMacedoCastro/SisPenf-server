import { Router } from 'express';
import HospitalController from '../controllers/hospital.controller';
import UserController from '../controllers/user.controller';
import InfirmaryController from '../controllers/infirmary.controller';
import HospitalBedController from '../controllers/hospitalBed.controller';
import QuestionTypeControler from '../controllers/questionType.controller';
import QuestionController from '../controllers/question.controller';
import QuestionOptionController from '../controllers/option.controller';
import PatientController from '../controllers/patient.controller';
import AnserController from '../controllers/answer.controller';
import AuthController from '../controllers/auth.controller';
import DiagnosisController from '../controllers/diagnosis.controller';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

const userController = new UserController();
const hospitalController = new HospitalController();
const infirmaryController = new InfirmaryController();
const hospitalBedController = new HospitalBedController();
const questionTypeController = new QuestionTypeControler();
const questionController = new QuestionController();
const questionOptionController = new QuestionOptionController();
const patientController = new PatientController();
const answerController = new AnserController();
const authController = new AuthController();
const diagnosisController = new DiagnosisController();

routes.get('/', (_req, res) => {
  res.send('Hello darkness my old friend!');
});

routes.post('/user', userController.createUser);
routes.get('/user/:userId?', userController.getUsers);

routes.post('/login', authController.login);
routes.post('/change-password', [checkJwt], authController.changePassword);

routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', [checkJwt], hospitalController.getAllHospitals);

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
routes.get('/option', questionOptionController.GetOptions);
routes.delete('/option/:id', questionOptionController.DeleteOptionById);

routes.post('/diagnosis', diagnosisController.CreateDiagnosis);
routes.get('/diagnosis', diagnosisController.GetDiagnoses);
routes.delete('/diagnosis', diagnosisController.DeleteDiagnoses);

routes.post('/patient', patientController.CreatePatient);
routes.get('/patient/:patientId?', patientController.GetPatient);
routes.delete('/patient', patientController.DeletePatients);

routes.get('/answer/:patientId?/:questionType?', answerController.GetAnswers);
routes.post('/answer', answerController.CreateAnswer);
routes.post('/answers', answerController.CreateAnswers);
routes.delete('/answer', answerController.DeleteAnswers);

export default routes;
