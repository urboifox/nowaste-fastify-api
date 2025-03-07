import { createServer } from '../src/index';

const app = createServer();

export default async function handler(request: any, response: any) {
    await app.ready();
    app.server.emit('request', request, response);
}
