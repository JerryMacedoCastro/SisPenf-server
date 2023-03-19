import { DataSource } from 'typeorm';

import { Answer } from './entities/answer.entity';
import { Hospital } from './entities/hospital.entity';
import { HospitalBed } from './entities/hospitalBed.entity';
import { Infirmary } from './entities/infirmary.entity';
import { Patient } from './entities/patient.entity';
import { Question } from './entities/question.entity';
import { QuestionType } from './entities/questionType.entity';
import { User } from './entities/user.entity';
import { Option } from './entities/option.entity';
import { Diagnosis } from './entities/diagnosis.entity';

const AppDataSource = new DataSource({
  port: 5432,
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: [
    Answer,
    Hospital,
    HospitalBed,
    Infirmary,
    Option,
    Patient,
    Question,
    QuestionType,
    User,
    Diagnosis,
  ],

  migrations: ['./src/migrations/**.ts'],

  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
});

export default AppDataSource;
