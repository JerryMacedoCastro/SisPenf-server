import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import jwt from 'jsonwebtoken';

export default class UserController {
  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, name, cpf, position, password } = request.body;

    try {
      const userRepository = getRepository(User);
      const isExistingUser = await userRepository.findOne({ email: email });

      if (isExistingUser)
        throw new Error(`The email ${isExistingUser.email} already exists!!`);

      const user = userRepository.create({
        name,
        email,
        cpf,
        position,
        password,
        isActive: false,
      });
      user.hashPassword();
      const res = await userRepository.save(user);

      return response.status(201).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async getUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { userId } = request.params;

      const userRepository = getRepository(User);
      if (userId) {
        const user = await userRepository.findOne(userId, {
          select: ['id', 'email', 'name', 'position'],
        });
        if (user) return response.status(200).send(user);
        throw new Error('User not found');
      }
      const allUsers = await userRepository.find({
        // select: ['id', 'email', 'name', 'position'],
      });

      return response.status(200).send(allUsers);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
