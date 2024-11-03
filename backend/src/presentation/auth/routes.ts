import { Router } from 'express';
import { ShortenerController } from './controller';

export class ShortenerRoutes {

    constructor(
        private readonly shortenerController: ShortenerController,
    ) {}

    public get routes(): Router {

        const router = Router();
        
        router.post('/', this.shortenerController.registerUrl );

        return router;
    };
};