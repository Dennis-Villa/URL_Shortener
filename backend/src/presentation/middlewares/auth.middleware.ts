import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthMiddleware {

    static async validateJWT( request: Request, response: Response, next: NextFunction ) {

        const authorization = request.header( 'Authorization' );
        if ( !authorization ) {
            response.status( 401 ).json({
                error: 'No token provided',
            });
            return;
        }
        if ( !authorization.startsWith('Bearer ') ) {
            response.status( 401 ).json({
                error: 'Invalid Bearer token',
            });
            return;
        }

        const token = authorization?.split( ' ' ).at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) {
                response.status( 401 ).json({
                    error: 'Invalid token',
                });
                return;
            }

            const user = await prisma.userModel.findUnique({
                where: {
                    id: Number(payload.id),
                },
            })
            if ( !user /*|| !user.emaiValidated*/ ) {
                response.status( 401 ).json({
                    error: 'Invalid user',
                });
                return
            }

            const { password, ...SecureUser } = user;

            request.body.user = SecureUser;
            next();
        }
        catch( error ) {

            response.status( 500 ).json({ 
                error: 'Internal server error: Invalid token validation.'
            });
        };
    };

    static async registerUrlJWT( request: Request, response: Response, next: NextFunction ) {

        const isPrivate = ( request.body.type === 'private' );
        const returnError = ( errorMessage: string ) => {
            
            response.status( 401 ).json({
                error: errorMessage,
            });

            return;
        }

        const authorization = request.header( 'Authorization' );
        if ( !authorization ) {

            if( isPrivate ) {

                returnError( 'Token required for private URL.' );
                return;
            }

            next();
            return;
        }
        if ( !authorization.startsWith('Bearer ') ) {

            if( isPrivate ) {

                returnError( 'Bearer Token required for private URL.' );
                return;
            }

            next();
            return;
        }

        const token = authorization?.split( ' ' ).at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) {

                if( isPrivate ) {

                    returnError( 'Invalid token.' );
                    return;
                }

                next();
                return;
            }

            const user = await prisma.userModel.findUnique({
                where: {
                    id: Number(payload.id),
                },
            })
            if ( !user ) {

                if( isPrivate ) {

                    returnError( 'Invalid user.' );
                    return;
                }

                next();
                return;
            }

            const { password, ...SecureUser } = user;

            request.body.user = SecureUser;
            next();
        }
        catch( error ) {

            response.status( 500 ).json({ 
                error: 'Internal server error: Invalid token validation.'
            });
        };
    };
};