import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: string;
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username?: string;
    role: string;
    admin?: boolean;
    empleado?: boolean;
    cliente?: boolean;
    empresaId?: number;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
