import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/questionType.entity';
import { Option } from '../entities/option.entity';
import { Answer } from '../entities/answer.entity';

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
      const questionRepository = getRepository(Question);
      const isExistingDescription = await questionRepository.findOne({
        description: description,
      });
      // if (isExistingDescription) {
      //   throw new Error('The given question already exist!');
      // }
      const typeRepository = getRepository(QuestionType);
      const isExistingType = typeRepository.findOne(type);
      if (!isExistingType)
        throw new Error('The given question type does not exist!');

      const newQuestion = questionRepository.create({
        id: isExistingDescription?.id,
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

  async GetQuestions(request: Request, response: Response): Promise<Response> {
    try {
      const { questionType } = request.params;
      const type = Number(questionType);
      const questionRepository = getRepository(Question);
      let res;
      if (type) {
        res = await questionRepository.find({
          where: { type: type },
          relations: ['type', 'options'],
        });
      } else {
        res = await questionRepository.find({
          relations: ['type', 'options'],
        });
      }

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async DeleteQuestionById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { questionId } = request.params;
      const id = Number(questionId);
      const questionRepository = getRepository(Question);

      if (id) {
        const res = await questionRepository.findOne({ where: { id } });

        if (res) {
          const answerRepository = getRepository(Answer);
          const asnswers = await answerRepository.find({
            where: { question: res },
          });
          if (asnswers) {
            await answerRepository.delete({ question: res });
            await questionRepository.delete({ id: res.id });
          }
        }
        return response.status(200).send(res);
      } else {
        throw new Error('Question not found');
      }
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}
