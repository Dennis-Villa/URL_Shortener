import { CustomError, LoginUserDto, LoginUserUseCase, RegisterUserDto, RegisterUserUseCase, ValidateEmailUseCase } from '../../domain';
// import { EmailService } from './email.service';

export class AuthService {

    constructor(
        private readonly webServiceUrl: string,
        // private readonly emailService: EmailService,
    ){};

    // private async sendEmailValidationLink( email: string ) {

    //     const token = await JwtAdapter.generateToken({ email });
    //     if( !token ) throw CustomError.internalServer( 'Error getting token' );

    //     const link = `${ this.webServiceUrl }/auth/validate-email/${ token }`;

    //     const html = `
    //     <h1>Validate your email</h1>
    //     <p>Click on the following link to validate your email</p>
    //     <a href="${ link }">Validate your email</a>
    //     `;

    //     const options = {
    //         to: email,
    //         subject: 'Validate your email',
    //         htmlBody: html,
    //     };
        
    //     const isSet = await this.emailService.sendEmail( options );
    //     if( !isSet ) throw CustomError.internalServer( 'Error sending email' );

    //     return true;
    // };

    public async registerUser( dto: RegisterUserDto ) {

        return RegisterUserUseCase.execute( dto );
    };

    public async loginUser( dto: LoginUserDto ) {

        return LoginUserUseCase.execute( dto );
    };

    public async validateEmail( token: string ) {

        return ValidateEmailUseCase.execute( token );
    };
};