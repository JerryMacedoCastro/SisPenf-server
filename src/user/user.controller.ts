import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from './user.entity';

class UserController {
  async Create(request: Request, response: Response) {
    const { firstName, lastName } = request.body;

    const userRepository = getRepository(User);

    const user = userRepository.create({
      firstName,
      lastName,
      isActive: true,
    });

    const res = await userRepository.save(user);

    return response.status(201).send(res);
  }
}

export default UserController;
