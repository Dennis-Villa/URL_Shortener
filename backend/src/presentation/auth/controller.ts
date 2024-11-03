import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            response.status( error.statusCode ).json({ error: error.message });
            return;
        };

        response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
        return;
    };

    public registerUser = async( request: Request, response: Response ) => {

        const [ error, registerUserDto ] = RegisterUserDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.authService.registerUser( registerUserDto! )
            .then( data => response.status( 200 ).json({ ...data }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public loginUser = async( request: Request, response: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.authService.loginUser( loginUserDto! )
            .then( data => response.status( 200 ).json({ ...data }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public validateEmail = async( request: Request, response: Response ) => {

        const { token } = request.params;
        this.authService.validateEmail( token )
            .then( () => response.json( 'Email validated' ))
            .catch( ( error ) => this.handleError( error, response ));
    };
};