import { PrismaClient, UrlModel } from "@prisma/client";
import { CustomError } from "../../errors/custom.error";
import { GetPrivateUrlsDto } from "../../dtos/url/getPrivateUrls.dto";
import { UrlsPagination } from "./getPublicUrls.use-case";

const prisma = new PrismaClient();

export class getPrivateUrlsUseCase {

    static async execute( dto: GetPrivateUrlsDto ): Promise<UrlsPagination> {

        const { page, limit, user } = dto;
        const { id } = user;

        try {

            const [ total, urls ] = await Promise.all([
                prisma.urlModel.count({ 
                    where: { type: 'PRIVATE', userId: id }, 
                }),
                prisma.urlModel.findMany({
                    where: { type: 'PRIVATE', userId: id }, 
                    take: limit,
                    skip: ( ( page - 1 ) * limit ),
                }),
            ]);

            return {
                page,
                limit,
                total,
                prev: ( page - 1 > 0) ? `/api/urls?page=${( page-1 )}&limit=${ limit }` : null,
                next: ( page * limit < total ) ? `/api/urls?page=${( page+1 )}&limit=${ limit }`: null,
                urls,
            }; 
        }
        catch( error ) {

            console.log( error );
            throw CustomError.internalServer( 'Internal server error' );
        }
    };
};
