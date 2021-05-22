import { Router } from 'express';
import HospitalController from '../controllers/hospital.comtroller';
import UserController from '../controllers/user.controller';
import InfirmaryController from '../controllers/infirmary.controller';

const routes = Router();

const userController = new UserController();
const hospitalController = new HospitalController();
const infirmaryController = new InfirmaryController();

routes.get('/', (_req, res) => {
  res.send('Hello darkness my old friend!');
});

routes.post('/user', userController.createUser);
routes.get('/user', userController.getAllUsers);

routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', hospitalController.getAllHospitals);

routes.post('/infirmary', infirmaryController.createInfirmary);
routes.get('/infirmary', infirmaryController.getAllInfirmaries);

export default routes;
