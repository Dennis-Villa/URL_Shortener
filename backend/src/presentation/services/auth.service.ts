import { CustomError, LoginUserDto, LoginUserUseCase, RegisterUserDto, RegisterUserUseCase, SendValidationEmailUseCase, ValidateEmailUseCase } from '../../domain';
import { EmailService } from './email.service';

export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ){};

    public async registerUser( dto: RegisterUserDto ) {

        const registerInfo = await RegisterUserUseCase.execute( dto );
        const { user } = registerInfo;

        const emailOptions = await SendValidationEmailUseCase.execute( user.email );

        const isSet = await this.emailService.sendEmail( emailOptions );
        if( !isSet ) throw CustomError.internalServer( 'Error sending email' );

        return registerInfo;
    };

    public async loginUser( dto: LoginUserDto ) {

        return LoginUserUseCase.execute( dto );
    };

    public async validateEmail( token: string ) {

        return ValidateEmailUseCase.execute( token );
    };
};