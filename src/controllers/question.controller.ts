import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/questionType.entity';

export default class QuestionController {
  async CreateQuestion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { description, type, allowComment } = request.body;

      const typeRepository = getRepository(QuestionType);
      const isExistingType = typeRepository.findOne(type);
      if (!isExistingType)
        throw new Error('The given question type does not exist!');

      const questionRepository = getRepository(Question);
      const isExistingDescription = await questionRepository.findOne({
        description: description,
      });
      if (isExistingDescription)
        return response.status(200).send(isExistingDescription);

      const newQuestion = questionRepository.create({
        description,
        type,
        allowComment,
      });

      await questionRepository.save(newQuestion);
      return response.status(200).send(newQuestion);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetQuestions(_request: Request, response: Response): Promise<Response> {
    try {
      const questionRepository = getRepository(Question);
      const res = await questionRepository.find({
        relations: ['type'],
      });

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
