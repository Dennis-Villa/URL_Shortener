import { UserModel } from "@prisma/client";

export class GetPrivateUrlsDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly user: UserModel,
    ){};

    static create( props: { [key: string]: any  } ): [ string?, GetPrivateUrlsDto? ] {

        const { user, page=1, limit=10 } = props;
        const pageNumber = Number( page );
        const limitNumber = Number( limit );

        if( isNaN( pageNumber ) || isNaN( limitNumber ) ) return [ 'Page and Limit must be numbers' ];
        if( pageNumber <= 0 || limitNumber <= 0 ) return [ 'Page and Limit must be greater than 0' ];

        if( !user ) return [ 'User data is required.' ];

        return [ undefined, new GetPrivateUrlsDto( pageNumber, limitNumber, user ) ];
    };
};