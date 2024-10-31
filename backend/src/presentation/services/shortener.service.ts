import { CustomError } from "../../domain";

export class ShortenerService {

    constructor() {};

    public async registerUrl(){
        throw CustomError.internalServer("Not implemented");
    };
};