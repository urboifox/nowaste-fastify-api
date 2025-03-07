import fastify, {
    type FastifyReply,
    type FastifyRequest,
    type FastifyServerOptions
} from 'fastify';
import { routes } from './lib/routes';
import { plugins } from './lib/plugins';

const createServer = () => {
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

const app = createServer();

// For local development
if (process.env.NODE_ENV !== 'production') {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

// For Vercel serverless deployment
export default async function handler(req: FastifyRequest, res: FastifyReply) {
    await app.ready();
    app.server.emit('request', req, res);
}
