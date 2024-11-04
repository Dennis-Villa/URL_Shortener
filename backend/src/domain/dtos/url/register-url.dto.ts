import { UserModel } from "@prisma/client";

export class RegisterUrlDto {

    private constructor(
        public readonly url: string,
        public readonly type: 'public' | 'private',
        public readonly protocol: 'http' | 'https',
        public readonly user?: UserModel,
    ){};

    static create( props: { [key: string]: any  }): [ string?, RegisterUrlDto? ] {

        const { url, user, type = 'public', protocol = 'https' } = props;

        if( !url ) return [
            'The parameter \'url\' is required.'
        ];

        return [ undefined, new RegisterUrlDto( 
            url, type, protocol, user,
        )];
    };
};