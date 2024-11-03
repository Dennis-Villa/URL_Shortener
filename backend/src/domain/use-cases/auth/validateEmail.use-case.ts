import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../errors/custom.error";
import { JwtAdapter } from "../../../config";

const prisma = new PrismaClient();

export class ValidateEmailUseCase {

    static async execute( token: string ): Promise<boolean> {

        try {

            const payload = await JwtAdapter.validateToken( token );
            if( !payload ) throw CustomError.unauthorized( 'Invalid token' );

            const { email } = payload as { email: string };
            if( !email ) throw CustomError.internalServer( 'Email not in token' );

            const user = await prisma.userModel.findUnique({
                where: {
                    email,
                }
            });
            if( !user ) throw CustomError.internalServer( 'Email not exists' );

            await prisma.userModel.update({
                data: {
                    validated: true,
                },
                where: {
                    id: user.id,
                }
            });
            return true;
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };
};
