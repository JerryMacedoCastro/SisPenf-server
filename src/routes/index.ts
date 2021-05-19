import { Router } from 'express';
import UserController from '../user/user.controller';

const routes = Router();

const userController = new UserController();
routes.get('/', (_req, res) => {
  res.send('Hi Docker, thanks rocketseat!!!');
});

routes.post('/user', userController.Create);

export default routes;
