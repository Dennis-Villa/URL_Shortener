import { CustomError, LoginUserDto, LoginUserUseCase, RegisterUserDto, RegisterUserUseCase, SendValidationEmailUseCase, ValidateEmailUseCase } from '../../domain';
import { EmailService } from './email.service';

export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ){};

    public async registerUser( dto: RegisterUserDto ) {

        const { user } = await RegisterUserUseCase.execute( dto );

        const emailOptions = await SendValidationEmailUseCase.execute( user.email );

        const isSet = await this.emailService.sendEmail( emailOptions );
        if( !isSet ) throw CustomError.internalServer( 'Error sending email' );

        return user;
    };

    public async loginUser( dto: LoginUserDto ) {

        return LoginUserUseCase.execute( dto );
    };

    public async validateEmail( token: string ) {

        return ValidateEmailUseCase.execute( token );
    };
};