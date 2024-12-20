import { Request, Response } from "express";
import { CustomError, GetPrivateUrlsDto, PaginationDto, RegisterUrlDto } from "../../domain";
import { ShortenerService } from "../services/shortener.service";

export class ShortenerController {

    constructor(
        private readonly shortenerService: ShortenerService,
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

    public registerUrl = async( request: Request, response: Response ) => {

        const [ error, registerUrlDto ] = RegisterUrlDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.shortenerService.registerUrl( registerUrlDto! )
            .then( data => response.status( 200 ).json({ ...data }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public redirectToUrl = async( request: Request, response: Response ) => {

        const { urlId } = request.params;
        const urlIdNumber = parseInt( urlId );

        this.shortenerService.redirectToUrl( urlIdNumber )
            .then( url => response.redirect( url ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getPublicUrls = async( request: Request, response: Response ) => {

        const { page = 1, limit = 10 } = request.query;

        const [ error, paginationDto ] = PaginationDto.create( Number( page ), Number( limit ) );
        if( error ) { 

            response.status(400).json({ error });
            return;
        };

        this.shortenerService.getPublicUrls( paginationDto! )
            .then( ( urls ) => response.status( 201 ).json( urls ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getPrivateUrls = async( request: Request, response: Response ) => {

        const { page = 1, limit = 10 } = request.query;
        const { user } = request.body;

        const [ error, getPrivateUrlsDto ] = GetPrivateUrlsDto.create({
            user,
            page,
            limit,
        });
        if( error ) { 

            response.status(400).json({ error });
            return;
        };

        this.shortenerService.getPrivateUrls( getPrivateUrlsDto! )
            .then( ( urls ) => response.status( 201 ).json( urls ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };
};