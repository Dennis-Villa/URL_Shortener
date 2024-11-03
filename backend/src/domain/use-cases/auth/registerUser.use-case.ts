import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../errors/custom.error";
import { RegisterUserDto } from "../../dtos/auth/registerUser.dto";
import { cryptAdapter, JwtAdapter } from "../../../config";

const prisma = new PrismaClient();

export class RegisterUserUseCase {

    static async execute( dto: RegisterUserDto ): Promise<{ [ key: string ]: any }> {

        const { email, password } = dto;

        try {

            const existUser = await prisma.userModel.findUnique({
                where: {
                    email,
                }
            });
            if( existUser ) throw CustomError.badRequest( 'Email already exist' );

            const user = await prisma.userModel.create({
                data: {
                    ...dto,
                    password: cryptAdapter.hash( password ),
                }
            });

            const token = await JwtAdapter.generateToken({ 
                id: user.id, 
                email: user.email, 
            });
            if( !token ) throw CustomError.internalServer( 'Error while creating JWT' );

            const { password: pass, ...userEntity } =  user;
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
