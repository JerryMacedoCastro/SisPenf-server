import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/questionType.entity';

export default class QuestionController {
  async createQuestion(
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
      questionRepository.create({
        description,
        type,
        allowComment,
      });
    } catch (error) {
      return response.status(400).send(error.message);
    }

    return response.send('');
  }
}
