
export class RegisterUrlDto {

    private constructor(
        public readonly url: string,
        public readonly type: 'public' | 'private',
    ){};

    static create( props: { [key: string]: any  }): [ string?, RegisterUrlDto? ] {

        const { url, type = 'public' } = props;

        if( !url ) return [
            'The parameter \'url\' is required.'
        ];

        return [ undefined, new RegisterUrlDto( 
            url, type,
        )];
    };
};