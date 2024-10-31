import { Router } from 'express';
import { ShortenerService } from '../services/shortener.service';
import { ShortenerController } from './controller';

export class ShortenerRoutes {

    static get routes(): Router {

        const router = Router();
        const shortenerService = new ShortenerService();
        const shortenerController = new ShortenerController(
            shortenerService
        );
        
        router.post('/', shortenerController.registerUrl );

        return router;
    };
};