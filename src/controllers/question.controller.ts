import { Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/questionType.entity';
import { Option } from '../entities/option.entity';
import { Answer } from '../entities/answer.entity';
import AppDataSource from '../ormconfig';
import { Diagnosis } from '../entities/diagnosis.entity';
import { diagnosesQuestionType } from '../helpers/diagnosis-type';

export default class QuestionController {
  async CreateQuestion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { description, type, allowComment, options, diagnoses } =
        request.body;

      const optionRepository = AppDataSource.getRepository(Option);

      const optionsArray: { description: string }[] = options;
      let newOptions: Option[] = [];

      for (let index = 0; index < optionsArray.length; index++) {
        const isExistingOption = await optionRepository.findOne({
          where: { description: optionsArray[index].description },
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
      const questionRepository = AppDataSource.getRepository(Question);
      const isExistingDescription = await questionRepository.findOne({
        where: { description },
      });
      // if (isExistingDescription) {
      //   throw new Error('The given question already exist!');
      // }
      const typeRepository = AppDataSource.getRepository(QuestionType);
      const isExistingType = await typeRepository.findOne({
        where: { id: Number(type) },
      });
      if (!isExistingType)
        throw new Error('The given question type does not exist!');

      const diagnosesArray: { description: string }[] = diagnoses;
      let newDiagnoses: Diagnosis[] = [];

      if (isExistingType.id === diagnosesQuestionType.id) {
        console.log('chegou aqui');
        const diagnosisRepository = AppDataSource.getRepository(Diagnosis);

        for (let index = 0; index < diagnosesArray.length; index++) {
          const isExistingDiagnosis = await diagnosisRepository.findOne({
            where: { description: diagnosesArray[index].description },
          });

          if (isExistingDiagnosis) {
            newDiagnoses = [...newDiagnoses, isExistingDiagnosis];
          } else {
            const newDiagnosis = diagnosisRepository.create({
              description: diagnosesArray[index].description,
            });
            const createdDiagnosis = await diagnosisRepository.save(
              newDiagnosis,
            );
            newDiagnoses = [...newDiagnoses, createdDiagnosis];
          }
        }
      }
      const newQuestion = questionRepository.create({
        id: isExistingDescription?.id,
        description,
        type,
        allowComment,
        options: newOptions,
        diagnoses: newDiagnoses,
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
      const questionRepository = AppDataSource.getRepository(Question);
      let res;
      if (type) {
        res = await questionRepository.find({
          where: { type: { id: type } },
          relations: ['type', 'options', 'diagnoses'],
        });
      } else {
        res = await questionRepository.find({
          relations: ['type', 'options', 'diagnoses'],
        });
      }

      return response.status(200).send(res);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetQuestionById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const questionId = Number(id);
      const questionRepository = AppDataSource.getRepository(Question);
      let res;
      if (questionId) {
        res = await questionRepository.find({
          where: { id: questionId },
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
      const questionRepository = AppDataSource.getRepository(Question);

      if (id) {
        const res = await questionRepository.findOne({ where: { id } });

        if (res) {
          const answerRepository = AppDataSource.getRepository(Answer);
          const asnswers = await answerRepository.find({
            where: { question: { id: res.id } },
          });
          if (asnswers) {
            await answerRepository.delete({
              question: { id: res.id },
            });
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
