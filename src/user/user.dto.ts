import { StringifyOptions } from 'querystring';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}
