"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const hash_password_1 = require("../services/hash.password");
const jwt_service_1 = require("../services/jwt-service");
const user_service_1 = require("../services/user-service");
const security_spec_1 = require("../utils/security-spec");
let UserController = class UserController {
    constructor(userRepository, 
    // @inject('service.hasher')
    hasher, 
    // @inject('service.user.service')
    userService, 
    // @inject('service.jwt.service')
    jwtService) {
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(userData) {
        (0, services_1.validateCredentials)(_.pick(userData, ['email', 'password']));
        userData.password = await this.hasher.hashPassword(userData.password);
        const savedUser = await this.userRepository.create(userData);
        //Error eliminado forzado
        console.log(savedUser.password);
        //delete savedUser.password;
        return savedUser;
    }
    async login(credentials) {
        // make sure user exist,password should be valid
        const user = await this.userService.verifyCredentials(credentials);
        console.log("user y userProfile");
        console.log(user);
        const userProfile = await this.userService.convertToUserProfile(user);
        console.log(userProfile);
        const token = await this.jwtService.generateToken(userProfile);
        console.log("token");
        console.log(token);
        return Promise.resolve({ token: token });
    }
    async me(currentUser) {
        return Promise.resolve(currentUser);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/signup', {
        responses: {
            '200': {
                description: 'Registro de Usuario',
                content: {
                    schema: (0, rest_1.getJsonSchemaRef)(models_1.User)
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.User]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "signup", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/login', {
        responses: {
            '200': {
                description: 'Cual es el Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)("jwt"),
    (0, rest_1.get)('/users/me', {
        security: security_spec_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'El actual perfil del usuario ---The current user profile',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getJsonSchemaRef)(models_1.User),
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(authentication_1.AuthenticationBindings.CURRENT_USER)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "me", null);
UserController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    (0, tslib_1.__param)(2, (0, core_1.inject)(keys_1.UserServiceBindings.USER_SERVICE)),
    (0, tslib_1.__param)(3, (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UserRepository,
        hash_password_1.BcryptHasher,
        user_service_1.MyUserService,
        jwt_service_1.JWTService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map