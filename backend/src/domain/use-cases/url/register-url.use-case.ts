import { PrismaClient, Url_Type } from "@prisma/client";
import dns from 'dns';
import { RegisterUrlDto } from "../../dtos/url/register-url.dto";
import { envs } from "../../../config";
import { CustomError } from "../../errors/custom.error";

const prisma = new PrismaClient();

export class RegisterUrlUseCase {
    
    constructor(){};

    async correctUrl( url: string, protocol: string ): Promise<string> {

        let correctedUrl;
        
        correctedUrl = ( url.startsWith('http://') || url.startsWith('https://') )
            ? url
            : `${protocol}://${url}`;
    
        const urlForSearch = correctedUrl.replace(/^(http|https):\/\//i, '');

        return new Promise((resolve, reject) => {
            dns.lookup( urlForSearch, ( error ) => {
                if( error ) reject( CustomError.badRequest( 'Incorrect URL.' ) );

                resolve( correctedUrl );
            });
        });
    };

    async urlExists( url: string, type: Url_Type, userId?: number ): Promise<{ [ key: string ]: any } | null> {

        try {
            const urls = await prisma.urlModel.findMany({
                where: {
                    original_url: url,
                    type,
                    userId,
                }
            });

            return urls.length > 0 ? urls[0] : null;
        }
        catch( error ){
            throw CustomError.internalServer(`Error searching urls.`);
        }
    };

    async execute( dto: RegisterUrlDto ): Promise<{ [ key: string ]: any }> {

        const { url, type, protocol, user } = dto;
        if( type === 'private' && user === undefined ){ 
            throw CustomError.badRequest(`Only logged users can create a private short url.`);
        }

        let { id, validated } = user || {};
        if( type === 'private' && validated === false ){ 
            throw CustomError.badRequest(`Only validated users can create a private short url.`);
        }
        if( type === 'public' ) id = undefined;

        const correctedType = type === "public" ? 'PUBLIC' : 'PRIVATE';
        
        const correctedUrl = await this.correctUrl( url, protocol );

        const existingUrl = await this.urlExists( correctedUrl, correctedType, id );
        if( existingUrl !== null ) return existingUrl;

        try{
            const newUrl = await prisma.urlModel.create({
                data: {
                    type: correctedType,
                    original_url: correctedUrl,
                    short_url: 'temp',
                    userId: type === 'private' ? id : undefined,
                }
            });
    
            const shortUrl = `${envs.WEB_SERVICE_URL}${newUrl.id}`;
    
            return await prisma.urlModel.update({
                data: {
                    short_url: shortUrl,
                },
                where: {
                    id: newUrl.id,
                },
            });
        }
        catch( error ){
            throw CustomError.internalServer(`Error registering url.`);
        }
    };
};
