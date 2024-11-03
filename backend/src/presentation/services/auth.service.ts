import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, RegisterUserUseCase } from '../../domain';
import { UserEntity } from '../../domain';
import { cryptAdapter, JwtAdapter } from '../../config';
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

    public async loginUser( loginUserDto: LoginUserDto ) {

        try {

            const user = await UserModel.findOne({
                email: loginUserDto.email,
            });
            if( !user ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const isMatching = cryptAdapter.compare(
                loginUserDto.password,
                user.password,
            );
            if( !isMatching ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const token = await JwtAdapter.generateToken({ 
                    id: user.id, 
                    email: user.email, 
                });
            if( !token ) throw CustomError.internalServer( 'Error while creating JWT' );

            const { password, ...userEntity } = UserEntity.fromObject( user );
            return {
                user: userEntity,
                token,
            };
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };

    public async validateEmail( token: string ) {

        try {

            const payload = await JwtAdapter.validateToken( token );
            if( !payload ) throw CustomError.unauthorized( 'Invalid token' );

            const { email } = payload as { email: string };
            if( !email ) throw CustomError.internalServer( 'Email not in token' );

            const user = await UserModel.findOne({ email });
            if( !user ) throw CustomError.internalServer( 'Email not exists' );

            user.emailValidated = true;

            await user.save();

            return true;
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };
};