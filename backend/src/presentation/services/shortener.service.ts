import { CustomError, RegisterUrlDto, RegisterUrlUseCase, FindUrlUseCase } from "../../domain";

export class ShortenerService {

    constructor() {};

    public async registerUrl( dto: RegisterUrlDto ) {
       
        return new RegisterUrlUseCase().execute( dto );
    };

    public async redirectToUrl( urlId: number ): Promise<string> {
        
        const originalUrl = await new FindUrlUseCase().execute( urlId );
        if( originalUrl === null ) throw CustomError.notFound( "The URL don't exist in our database." );

        return originalUrl || '/';
    };
};