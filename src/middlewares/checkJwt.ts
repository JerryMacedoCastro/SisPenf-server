import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Get the jwt token from the head
  const token = <string>req.headers.auth;
  let jwtPayload;
  const jwtSecret = process.env.SECRET ? process.env.SECRET : '';

  // Try to validate the token and get data
  try {
    jwtPayload = <User>jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ error: error.message });
    return;
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, jwtSecret, {
    expiresIn: '1h',
  });
  res.setHeader('token', newToken);

  // Call the next middleware or controller
  next();
};
