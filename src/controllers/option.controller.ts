import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Option } from '../entities/option.entity';

export default class QuestionOptionController {
  async CreateOption(request: Request, response: Response): Promise<Response> {
    try {
      const { description } = request.body;
      const optionRepository = getRepository(Option);
      const isExistingOption = await optionRepository.findOne({
        description: description,
      });

      if (isExistingOption) throw new Error('The given option already exists');

      const newOption = optionRepository.create({ description });
      optionRepository.save(newOption);

      return response.status(200).send(newOption);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetOptions(_request: Request, response: Response): Promise<Response> {
    try {
      const optionRepository = getRepository(Option);
      const options = await optionRepository.find();

      return response.status(200).send(options);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async DeleteOptions(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const optionRepository = getRepository(Option);
      const options = await optionRepository.delete({});

      return response.status(200).send(options);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
