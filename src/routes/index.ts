import { Router } from 'express';

const routes = Router();

routes.get("/", (_req, res) => {
  res.send("Hi Docker, thanks rocketseat!!!");
});

export default routes;
