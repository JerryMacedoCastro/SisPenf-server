import { QuestionType } from '../entities/questionType.entity';
import { Request, Response } from 'express';
import AppDataSource from '../ormconfig';
export default class QuestionTypeControleer {
  async CreateQuestionType(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { label } = request.body;

      const questionTypeRepository = AppDataSource.getRepository(QuestionType);

      const newQuestionType = questionTypeRepository.create({
        label,
        isActive: true,
      });

      questionTypeRepository.save(newQuestionType);

      return response.status(200).send(newQuestionType);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetQuestionTypes(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const questionTypeRepository = AppDataSource.getRepository(QuestionType);

      const res = await questionTypeRepository.find();

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
