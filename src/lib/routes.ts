import { productsRoutes } from '../modules/products/routes';
import fp from 'fastify-plugin';

export const routes = fp((app, _opts, done) => {
    app.register(productsRoutes, { prefix: '/products' });

    done();
});
