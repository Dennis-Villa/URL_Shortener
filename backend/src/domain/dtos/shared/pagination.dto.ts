
export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ){};

    static create( page: ( number | string ) = 1, limit: ( number | string ) = 10 ): [ string?, PaginationDto? ] {

        const pageNumber = Number( page );
        const limitNumber = Number( limit );

        if( isNaN( pageNumber ) || isNaN( limitNumber ) ) return [ 'Page and Limit must be numbers' ];
        if( pageNumber <= 0 || limitNumber <= 0 ) return [ 'Page and Limit must be greater than 0' ];

        return [ undefined, new PaginationDto( pageNumber, limitNumber ) ];
    };
};