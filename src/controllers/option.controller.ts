import { Question } from '../entities/question.entity';
import { Request, Response } from 'express';
import { Option } from '../entities/option.entity';
import AppDataSource from '../ormconfig';
export default class QuestionOptionController {
  async CreateOption(request: Request, response: Response): Promise<Response> {
    try {
      const { description } = request.body;
      const optionRepository = AppDataSource.getRepository(Option);
      const isExistingOption = await optionRepository.findOne({
        where: { description },
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
      const optionRepository = AppDataSource.getRepository(Option);
      const options = await optionRepository.find();

      return response.status(200).send(options);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async DeleteOptionById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      if (id) {
        const optionRepository = AppDataSource.getRepository(Option);
        const option = await optionRepository.find({
          where: { id: Number(id) },
        });
        if (option.length > 1)
          throw new Error('More than 1 option with this id');
        else {
          const questionRepository = AppDataSource.getRepository(Question);
          const questions = await questionRepository.find({
            where: { options: { id: Number(id) } },
          });

          if (questions.length) {
            return response
              .status(403)
              .send(JSON.stringify({ questionsRelated: questions }));
          } else {
            const options = await optionRepository.delete({ id: Number(id) });
            return response.status(200).send(options);
          }
        }
      }
      throw new Error('id not provided');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
