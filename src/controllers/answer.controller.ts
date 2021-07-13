import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Option } from '../entities/option.entity';
import { Patient } from '../entities/patient.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';

export default class AnserController {
  async CreateAnswer(request: Request, response: Response): Promise<Response> {
    try {
      const { userId, patientId, questionId, options, comment } = request.body;

      const answers: { option: number }[] = options;

      const user = await getRepository(User).findOne(userId);
      if (!user) throw new Error('The given user does not exists!!');

      const patient = await getRepository(Patient).findOne(patientId);
      if (!patient) throw new Error('The given patient does not exists!!');

      const question = await getRepository(Question).findOne({
        where: { id: questionId },
        relations: ['options'],
      });
      if (!question) throw new Error('The given question does not exists!!');

      let selectedOptions: Option[] = [];
      for (let index = 0; index < answers.length; index++) {
        const isValidAnswer = question.options.find(
          op => op.id === answers[index].option,
        );
        if (!isValidAnswer) throw new Error('Invalid answer');
        selectedOptions = [...selectedOptions, isValidAnswer];
      }

      const answerRepository = getRepository(Answer);

      const isUpdateQuestion = await answerRepository.findOne({
        where: { patient, question },
      });

      const newAnswer = answerRepository.create({
        id: isUpdateQuestion?.id,
        user,
        question,
        patient,
        selectedOptions,
        comment,
      });

      const createdAnswer = await answerRepository.save(newAnswer);

      return response.status(200).send(createdAnswer);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetAnswers(request: Request, response: Response): Promise<Response> {
    try {
      const answerRepository = getRepository(Answer);
      const answers = await answerRepository.find({
        relations: ['patient', 'question', 'selectedOptions'],
      });

      return response.status(200).json(answers);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async DeleteAnswers(request: Request, response: Response): Promise<Response> {
    try {
      const answerRepository = getRepository(Answer);
      const answers = await answerRepository.delete({});

      return response.status(200).json(answers);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
