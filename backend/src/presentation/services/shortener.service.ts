import { CustomError, RegisterUrlDto } from "../../domain";

export class ShortenerService {

    constructor() {};

    public async registerUrl( dto: RegisterUrlDto ){
        throw CustomError.internalServer("Not implemented");
    };
};