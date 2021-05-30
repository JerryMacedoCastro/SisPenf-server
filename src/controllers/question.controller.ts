import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/questionType.entity';
import { Option } from '../entities/option.entity';

export default class QuestionController {
  async CreateQuestion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { description, type, allowComment, options } = request.body;

      const optionRepository = getRepository(Option);

      const optionsArray: { description: string }[] = options;
      let newOptions: Option[] = [];

      for (let index = 0; index < optionsArray.length; index++) {
        const isExistingOption = await optionRepository.findOne({
          description: optionsArray[index].description,
        });
        if (isExistingOption) {
          newOptions = [...newOptions, isExistingOption];
        } else {
          const newOption = optionRepository.create({
            description: optionsArray[index].description,
          });
          const createdOption = await optionRepository.save(newOption);
          newOptions = [...newOptions, createdOption];
        }
      }

      const typeRepository = getRepository(QuestionType);
      const isExistingType = typeRepository.findOne(type);
      if (!isExistingType)
        throw new Error('The given question type does not exist!');

      const questionRepository = getRepository(Question);
      const isExistingDescription = await questionRepository.findOne({
        description: description,
      });
      if (isExistingDescription)
        throw new Error('The given question already exist!');

      const newQuestion = questionRepository.create({
        description,
        type,
        allowComment,
        options: newOptions,
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
        relations: ['type', 'options'],
      });

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
