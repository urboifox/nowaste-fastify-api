import { createServer } from '@/lib/server';

// For vercel serverless deployment
const app = createServer();
export default async function handler(req: any, res: any) {
    await app.ready();
    app.server.emit('request', req, res);
}
