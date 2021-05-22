import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class UserController {
  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, firstName, lastName, password } = request.body;

    try {
      const userRepository = getRepository(User);
      const isExistingUser = await userRepository.findOne({ email: email });

      if (isExistingUser)
        throw new Error(`The email ${isExistingUser.email} already exists!!`);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isActive: true,
      });
      const res = await userRepository.save(user);

      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async getAllUsers(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const userRepository = getRepository(User);
      const allUsers = await userRepository.find();

      return response.status(200).send(allUsers);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
