import { PrismaClient } from "@prisma/client";
import { CustomError } from "../errors/custom.error";

const prisma = new PrismaClient();

export class FindUrlUseCase {
    
    constructor(){};

    async execute( urlId: number ): Promise<string | null> {

        try{
            const newUrl = await prisma.urlModel.findUnique({
                select: {
                    original_url: true,
                },
                where: {
                    id: urlId,
                }
            });
    
            return newUrl?.original_url || null;
        }
        catch( error ){
            throw CustomError.internalServer(`Error searching url.`);
        }
    };
};
