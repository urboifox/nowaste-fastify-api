import { createServer } from '@/lib/server';

const app = createServer();

// For local development
try {
    await app.listen({ port: 3000 });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
