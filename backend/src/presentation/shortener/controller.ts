import { Response } from "express";
import { CustomError } from "../../domain";
import { ShortenerService } from "../services/shortener.service";

export class ShortenerController {

    constructor(
        private readonly shortenerService: ShortenerService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json({ error: error.message });
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    public registerUrl = async( request: Request, response: Response ) => {

        // const [ error, generateKeyPairsDto ] = GenerateKeyPairsDto.create( request.body );
        // if ( !!error ){ 

        //     response.status(400).json({ error });
        //     return;
        // };

        this.shortenerService.registerUrl(  )
            // .then( keys => response.status( 200 ).json({ ...keys }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
};