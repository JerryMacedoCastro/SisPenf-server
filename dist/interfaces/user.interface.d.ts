export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    position: string;
    isActive: boolean;
    createdAt: Date;
}
