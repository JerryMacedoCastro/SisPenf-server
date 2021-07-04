import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '../entities/user.entity';

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    // Check if username and password are set
    const { email, password } = request.body;
    if (!(email && password)) {
      response.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      return response.status(401).send({ error: error.message });
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return response.status(401).send({ error: 'wrong e-mail or password ' });
    }
    const jwtSecret = process.env.SECRET ? process.env.SECRET : '';
    // Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.email },
      jwtSecret,
      { expiresIn: '1h' },
    );

    // Send the jwt in the response
    return response.send({ token: token });
  }

  async changePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    // Get ID from JWT
    const id = response.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = request.body;
    if (!(oldPassword && newPassword)) {
      return response.status(400).send({ error: 'No parameters' });
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      return response.status(401).send();
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      return response.status(401).send();
    }

    user.password = newPassword;

    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    return response.status(204).send();
  }
}
export default AuthController;
