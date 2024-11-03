import nodemailer, { Transporter } from 'nodemailer';
import { CustomError } from '../../domain';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
};

export class EmailService {

    private transporter: Transporter;

    constructor(
        private readonly mailerEmail: string,
        mailerService: string,
        sendEmailPassword: string,
    ) {

        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: sendEmailPassword,
            },
            tls:{
                rejectUnauthorized: false,
            },
        });
    };

    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                from: this.mailerEmail,
                to: to,
                subject: subject,
                html: htmlBody,
            });

            return true;
        }
        catch ( error ) {

            throw CustomError.internalServer( `Error sending mail: ${ error }` );
        };
    };
};