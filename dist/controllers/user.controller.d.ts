import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { BcryptHasher } from '../services/hash.password';
import { JWTService } from '../services/jwt-service';
import { MyUserService } from '../services/user-service';
export declare class UserController {
    userRepository: UserRepository;
    hasher: BcryptHasher;
    userService: MyUserService;
    jwtService: JWTService;
    constructor(userRepository: UserRepository, hasher: BcryptHasher, userService: MyUserService, jwtService: JWTService);
    signup(userData: User): Promise<User>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    me(currentUser: UserProfile): Promise<UserProfile>;
}
