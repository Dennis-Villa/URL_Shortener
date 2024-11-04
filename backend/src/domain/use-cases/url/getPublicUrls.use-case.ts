import { PrismaClient, UrlModel } from "@prisma/client";
import { CustomError } from "../../errors/custom.error";
import { PaginationDto } from "../../dtos/shared/pagination.dto";

const prisma = new PrismaClient();

export interface UrlsPagination {
    page: number;
    limit: number;
    total: number;
    prev: string | null;
    next: string | null;
    urls: UrlModel[]
}

export class getPublicUrlsUseCase {

    static async execute( dto: PaginationDto ): Promise<UrlsPagination> {

        const { page, limit } = dto;

        try {

            const [ total, urls ] = await Promise.all([
                prisma.urlModel.count({ where: { type: 'PUBLIC' } }),
                prisma.urlModel.findMany({
                    where: { type: 'PUBLIC' },
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
