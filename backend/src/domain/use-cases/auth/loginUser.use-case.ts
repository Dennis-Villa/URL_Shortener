import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../errors/custom.error";
import { cryptAdapter, JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/loginUser.dto";

const prisma = new PrismaClient();

export class LoginUserUseCase {

    static async execute( dto: LoginUserDto ): Promise<{ [ key: string ]: any }> {

        const { email, password } = dto;

        try {

            const user = await prisma.userModel.findUnique({
                where: {
                    email,
                }
            });
            if( !user ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const isMatching = cryptAdapter.compare(
                password,
                user.password,
            );
            if( !isMatching ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const token = await JwtAdapter.generateToken({ 
                id: user.id, 
                email: user.email, 
            });
            if( !token ) throw CustomError.internalServer( 'Error while creating JWT' );

            const { password: pass, ...userEntity } = user;
            return {
                user: userEntity,
                token,
            };
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };
};
