import fastify, { type FastifyServerOptions } from 'fastify';
import { routes } from '@/lib/routes';
import { plugins } from '@/lib/plugins';

export const createServer = () => {
    // Fastify options
    const opts: FastifyServerOptions = {
        logger: true
    };

    // Pretty logger
    if (process.stdout.isTTY) {
        opts.logger = {
            transport: {
                target: '@fastify/one-line-logger'
            }
        };
    }

    // Initialize app
    const app = fastify(opts);

    // Plugins
    app.register(plugins);
    app.register(routes, { prefix: '/api' });

    app.get('/', () => {
        return { hello: 'world' };
    });

    return app;
};
