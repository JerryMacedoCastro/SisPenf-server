import { Router } from 'express';
import HospitalController from '../controllers/hospital.comtroller';
import UserController from '../controllers/user.controller';

const routes = Router();

const userController = new UserController();
const hospitalController = new HospitalController();

routes.get('/', (_req, res) => {
  res.send('Hello darkness my old friend!');
});

routes.post('/user', userController.createUser);
routes.get('/user', userController.getAllUsers);

routes.post('/hospital', hospitalController.createHospital);
routes.get('/hospital', hospitalController.getAllHospitals);

export default routes;
