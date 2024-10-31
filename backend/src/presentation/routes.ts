import { Router } from 'express';
import { ShortenerRoutes } from './shortener/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        
        // Definir las rutas
        router.use('/api/shortener', ShortenerRoutes.routes );

        return router;
    };
};