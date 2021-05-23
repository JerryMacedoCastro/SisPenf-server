import { Router } from 'express';
import HospitalController from '../controllers/hospital.controller';
import UserController from '../controllers/user.controller';
import InfirmaryController from '../controllers/infirmary.controller';
import HospitalBedController from '../controllers/hospitalBed.controller';

const routes = Router();

const userController = new UserController();
const hospitalController = new HospitalController();
const infirmaryController = new InfirmaryController();
const hospitalBedController = new HospitalBedController();

routes.get('/', (_req, res) => {
  res.send('Hello darkness my old friend!');
});

routes.post('/user', userController.createUser);
routes.get('/user', userController.getAllUsers);

routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', hospitalController.getAllHospitals);

routes.post('/infirmary', infirmaryController.createInfirmary);
routes.post('/infirmaries', infirmaryController.createSeveralInfirmaries);
routes.get('/infirmary', infirmaryController.getAllInfirmaries);

routes.get('/hospitalbed', hospitalBedController.getHospitalBeds);
routes.post('/hospitalbeds', hospitalBedController.createSeveralHospitalBeds);
routes.post('/hospitalbed', hospitalBedController.createHospitalBed);

export default routes;
