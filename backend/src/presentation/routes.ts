import { Router } from 'express';
import { ShortenerRoutes } from './shortener/routes';
import { ShortenerController } from './shortener/controller';
import { ShortenerService } from './services/shortener.service';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        const shortenerService = new ShortenerService();
        const shortenerController = new ShortenerController(
            shortenerService
        );
        const shortenerRoutes = new ShortenerRoutes(shortenerController);
        
        // Definir las rutas
        router.use('/api/shortener', shortenerRoutes.routes );
        router.get('/:urlId', shortenerController.redirectToUrl );

        return router;
    };
};