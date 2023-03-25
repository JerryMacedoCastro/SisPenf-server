import { Request, Response } from 'express';
import { Answer } from '../entities/answer.entity';
import { Option } from '../entities/option.entity';
import { Patient } from '../entities/patient.entity';
import { Diagnosis } from '../entities/diagnosis.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
import AppDataSource from '../ormconfig';
import { diagnosesQuestionType } from '../helpers/diagnosis-type';

interface IDiagnosis {
  description: string;
}
export default class AnserController {
  async CreateAnswer(request: Request, response: Response): Promise<Response> {
    try {
      const { userId, patientId, question, options, comment, diagnoses } =
        request.body;
      const optionsArray: { description: string }[] = options;
      const diagnosesArray: { description: string }[] = diagnoses;

      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: Number(userId) },
      });
      if (!user) throw new Error('The given user does not exists!!');

      const patient = await AppDataSource.getRepository(Patient).findOne({
        where: { id: Number(patientId) },
      });
      if (!patient) throw new Error('The given patient does not exists!!');

      const selectedQuestion = await AppDataSource.getRepository(
        Question,
      ).findOne({
        where: { description: question },
        relations: ['options', 'type', 'diagnoses'],
      });
      if (!selectedQuestion)
        throw new Error('The given question does not exists!!');

      let selectedOptions: Option[] = [];
      for (let index = 0; index < optionsArray.length; index++) {
        const isValidOption = selectedQuestion.options.find(option => {
          return option.description === optionsArray[index].description;
        });

        if (!isValidOption) throw new Error('Invalid option');
        selectedOptions = [...selectedOptions, isValidOption];
      }

      let selectedDiagnoses: Diagnosis[] = [];
      if (selectedQuestion.type.id === diagnosesQuestionType.id) {
        for (let index = 0; index < diagnosesArray.length; index++) {
          const isValidDiagnosis = selectedQuestion.diagnoses.find(
            diagnosis =>
              diagnosis.description === diagnosesArray[index].description,
          );

          if (!isValidDiagnosis) throw new Error('Invalid diagnosis');
          selectedDiagnoses = [...selectedDiagnoses, isValidDiagnosis];
        }
      }

      const answerRepository = AppDataSource.getRepository(Answer);

      const isUpdateQuestion = await answerRepository.findOne({
        where: {
          patient: { id: patient.id },
          question: { id: selectedQuestion.id },
        },
      });

      const newAnswer = answerRepository.create({
        id: isUpdateQuestion?.id,
        user,
        question: selectedQuestion,
        patient,
        selectedOptions,
        comment,
        selectedDiagnoses,
      });

      const createdAnswer = await answerRepository.save(newAnswer);

      return response.status(200).send(createdAnswer);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async CreateAnswers(request: Request, response: Response): Promise<Response> {
    try {
      const { userId, patientId, questions } = request.body;

      const answeredQuestions: {
        question: string;
        comment?: string;
        option?: string;
      }[] = questions;

      const errorQuestions: string[] = [];

      if (!questions.length || answeredQuestions.length === 0)
        throw new Error('No answers were given!!');

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { id: Number(userId) } });

      if (!user) throw new Error('The given user does not exists!!');

      const patient = await AppDataSource.getRepository(Patient).findOne({
        where: { id: Number(patientId) },
      });
      if (!patient) throw new Error('The given patient does not exists!!');

      let createdAnswers: Answer[] = [];
      for (let i = 0; i < answeredQuestions.length; i++) {
        const answer = answeredQuestions[i];

        const question = await AppDataSource.getRepository(Question).findOne({
          where: { description: answer.question },
          relations: ['options'],
        });
        console.log(question);
        if (!question) {
          console.log('entrou');
          errorQuestions.push(answer.question);
          console.log(errorQuestions.length);
        } else {
          const answerRepository = AppDataSource.getRepository(Answer);
          const isUpdateQuestion = await answerRepository.findOne({
            where: {
              patient: { id: patient.id },
              question: { id: question.id },
            },
          });

          let selectedOptions: Option[] = [];
          if (question.options.length > 0) {
            console.log(answer.option);
            const optionRepository = AppDataSource.getRepository(Option);
            const selectedOption = await optionRepository.findOne({
              where: { description: answer.option },
            });
            if (!selectedOption) throw new Error('Invalid option');
            selectedOptions = [selectedOption];
          }
          const newAnswer = answerRepository.create({
            id: isUpdateQuestion?.id,
            user,
            comment: answer.comment || '',
            question,
            patient,
            selectedOptions,
          });

          const createdAnswer = await answerRepository.save(newAnswer);
          createdAnswers = [...createdAnswers, createdAnswer];
        }
      }
      console.log(errorQuestions.length);
      if (errorQuestions.length > 0) {
        throw new Error(
          `Questions not created: ${JSON.stringify(errorQuestions)}`,
        );
      }
      return response
        .status(200)
        .send({ Message: 'All answers created or updated!' });
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  async GetAnswers(request: Request, response: Response): Promise<Response> {
    try {
      const { patientId, questionType } = request.params;

      const answerRepository = AppDataSource.getRepository(Answer);
      if (patientId && questionType) {
        const id = Number(patientId);
        const type = Number(questionType);
        const answers = await answerRepository.find({
          where: { patient: { id }, question: { type: { id: type } } },
          relations: [
            'patient',
            'question',
            'selectedOptions',
            'selectedDiagnoses',
          ],
        });
        return response.status(200).json(answers);
      }
      const answers = await answerRepository.find({
        relations: [
          'patient',
          'question',
          'selectedOptions',
          'selectedDiagnoses',
        ],
      });

      return response.status(200).json(answers);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async DeleteAnswers(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const answerRepository = AppDataSource.getRepository(Answer);
      const answers = await answerRepository.delete({});

      return response.status(200).json(answers);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
