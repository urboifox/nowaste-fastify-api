import type { FastifyPluginCallback } from 'fastify';
import { productsRoutes } from '../modules/products/routes';

export const routes: FastifyPluginCallback = (app, _opts, done) => {
    app.register(productsRoutes, { prefix: '/products' });

    done();
};
