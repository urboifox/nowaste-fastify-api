import fastifyCors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import fp from 'fastify-plugin';

export const plugins = fp((app, _opts, done) => {
    app.register(fastifyPostgres, {
        connectionString: process.env.DB_URI!,
        promise: true
    });

    app.register(fastifyCors);

    done();
});
