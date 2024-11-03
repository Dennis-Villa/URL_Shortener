
export class RegisterUrlDto {

    private constructor(
        public readonly url: string,
        public readonly type: 'public' | 'private',
        public readonly protocol: 'http' | 'https',
        public readonly userId?: number,
    ){};

    static create( props: { [key: string]: any  }): [ string?, RegisterUrlDto? ] {

        const { url, userId, type = 'public', protocol = 'https' } = props;

        if( !url ) return [
            'The parameter \'url\' is required.'
        ];

        return [ undefined, new RegisterUrlDto( 
            url, type, protocol, userId,
        )];
    };
};