import type { FastifyPluginCallback, FastifySchema } from 'fastify';

const schema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number'
                            },
                            name: {
                                type: 'string'
                            }
                        }
                    },
                    required: ['id', 'name']
                }
            }
        }
    }
};

export const productsRoutes: FastifyPluginCallback = (app, _opts, done) => {
    app.get('/', { schema }, async () => {
        const products = await app.pg.query('SELECT * FROM products');
        return { data: products.rows };
    });

    app.get('/:id', { schema }, async (req) => {
        console.log(req.params);
        return { hello: 'world' };
    });

    done();
};
