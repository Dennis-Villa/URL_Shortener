import { RegisterUrlDto } from "../dtos/register-url.dto";

export class RegisterUrlUseCase {
    
    constructor(){};

    async execute( dto: RegisterUrlDto ): Promise<{ [ key: string ]: any }> {

        const { url, type } = dto;

        return await {
            original_url: url,
            short_url: url,
            id: 1,
        };
    };
};
