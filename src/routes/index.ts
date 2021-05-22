import { Router } from 'express';
import UserController from '../controllers/user.controller';

const routes = Router();

const userController = new UserController();
routes.get('/', (_req, res) => {
  res.send('Hi Docker, thanks rocketseat!!!');
});

routes.post('/user', userController.createUser);
routes.get('/user', userController.getAllUsers);

export default routes;
