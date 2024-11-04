import { Router } from 'express';
import { ShortenerController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ShortenerRoutes {

    constructor(
        private readonly shortenerController: ShortenerController,
    ) {}

    public get routes(): Router {

        const router = Router();
        
        router.post('/', AuthMiddleware.registerUrlJWT, this.shortenerController.registerUrl );

        return router;
    };
};