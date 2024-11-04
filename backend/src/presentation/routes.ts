import { Router } from 'express';
import { ShortenerRoutes } from './shortener/routes';
import { ShortenerController } from './shortener/controller';
import { ShortenerService } from './services/shortener.service';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        const shortenerService = new ShortenerService();
        const shortenerController = new ShortenerController(
            shortenerService
        );
        const shortenerRoutes = new ShortenerRoutes(shortenerController);
        
        // Definir las rutas
        router.use('/auth', AuthRoutes.routes );
        router.use('/api/urls', shortenerRoutes.routes );
        router.get('/:urlId', shortenerController.redirectToUrl );

        return router;
    };
};