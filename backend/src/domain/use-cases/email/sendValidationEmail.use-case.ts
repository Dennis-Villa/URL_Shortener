import { CustomError } from "../../errors/custom.error";
import { envs, JwtAdapter } from "../../../config";

interface EmailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

export class SendValidationEmailUseCase {

    static async execute( email: string ): Promise<EmailOptions> {

        const token = await JwtAdapter.generateToken({ email });
        if( !token ) throw CustomError.internalServer( 'Error getting token' );

        const link = `${ envs.WEB_SERVICE_URL }auth/validate-email/${ token }`;

        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${ link }">Validate your email</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        };

        return options;
    };
};
