import { IUser } from '../interfaces/user.interface';
import { Answer } from './answer.entity';
export declare class User implements IUser {
    id: number;
    name: string;
    email: string;
    cpf: string;
    position: string;
    password: string;
    answers: Answer[];
    isActive: boolean;
    createdAt: Date;
}
