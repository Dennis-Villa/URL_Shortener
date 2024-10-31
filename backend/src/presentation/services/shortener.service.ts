import { CustomError, RegisterUrlDto, RegisterUrlUseCase } from "../../domain";

export class ShortenerService {

    constructor() {};

    public async registerUrl( dto: RegisterUrlDto ) {
        
        return new RegisterUrlUseCase().execute( dto );
    };
};