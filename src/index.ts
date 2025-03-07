import fastify, { type FastifyServerOptions } from 'fastify';
import { routes } from './lib/routes';
import { plugins } from './lib/plugins';

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
app.register(routes);

// Start listening for requests!
try {
    await app.listen({ port: 3000 });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}

// For vercel deployment
export default async function handler(req: any, res: any) {
    await app.ready();
    app.server.emit('request', req, res);
}
