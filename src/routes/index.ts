import { Router } from 'express';
import HospitalController from '../controllers/hospital.controller';
import UserController from '../controllers/user.controller';
import InfirmaryController from '../controllers/infirmary.controller';
import HospitalBedController from '../controllers/hospitalBed.controller';
import QuestionTypeControler from '../controllers/questionType.controller';
import QuestionController from '../controllers/question.controller';
import QuestionOptionController from '../controllers/Option.controller';

const routes = Router();

const userController = new UserController();
const hospitalController = new HospitalController();
const infirmaryController = new InfirmaryController();
const hospitalBedController = new HospitalBedController();
const questionTypeController = new QuestionTypeControler();
const questionController = new QuestionController();
const questionOptionController = new QuestionOptionController();

routes.get('/', (_req, res) => {
  res.send('Hello darkness my old friend!');
});

routes.post('/user', userController.createUser);
routes.get('/user/:userId?', userController.getUsers);

routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', hospitalController.getAllHospitals);

routes.post('/infirmary', infirmaryController.createInfirmary);
routes.post('/infirmaries', infirmaryController.createSeveralInfirmaries);
routes.get('/infirmary/:hospitalId?', infirmaryController.getInfirmaries);

routes.get('/hospitalbed/:infirmaryId?', hospitalBedController.getHospitalBeds);
routes.post('/hospitalbeds', hospitalBedController.createSeveralHospitalBeds);
routes.post('/hospitalbed', hospitalBedController.createHospitalBed);

routes.post('/questiontype', questionTypeController.CreateQuestionType);
routes.get('/questiontype', questionTypeController.GetQuestionTypes);

routes.post('/question', questionController.CreateQuestion);
routes.get('/question', questionController.GetQuestions);

routes.post('/option', questionOptionController.CreateOption);
routes.get('/option', questionOptionController.GetOptios);

export default routes;
