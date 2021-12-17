"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthApplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
// import {SECURITY_SCHEME_SPEC} from './utils/security-spec';
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const jwt_stratgies_1 = require("./authentication-stratgies/jwt-stratgies");
const keys_1 = require("./keys");
const sequence_1 = require("./sequence");
const hash_password_1 = require("./services/hash.password");
const jwt_service_1 = require("./services/jwt-service");
const user_service_1 = require("./services/user-service");
class AuthApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // setup binding
        this.setupBinding();
        // Add security spec
        this.addSecuritySpec();
        this.component(authentication_1.AuthenticationComponent);
        (0, authentication_1.registerAuthenticationStrategy)(this, jwt_stratgies_1.JWTStrategy);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    setupBinding() {
        // this.bind('service.hasher').toClass(BcryptHasher);
        // this.bind('rounds').to(10);
        // this.bind('service.user.service').toClass(MyUserService)
        // this.bind('service.jwt.service').toClass(JWTService);
        // this.bind('authentication.jwt.secret').to('dvchgdvcjsdbhcbdjbvjb');
        // this.bind('authentication.jwt.expiresIn').to('7h');
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(hash_password_1.BcryptHasher);
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        this.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    }
    addSecuritySpec() {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'test application',
                version: '1.0.0',
            },
            paths: {},
            components: { securitySchemes: authentication_jwt_1.SECURITY_SCHEME_SPEC },
            security: [
                {
                    // secure all endpoints with 'jwt'
                    jwt: [],
                },
            ],
            servers: [{ url: '/' }],
        });
    }
}
exports.AuthApplication = AuthApplication;
//# sourceMappingURL=application.js.map