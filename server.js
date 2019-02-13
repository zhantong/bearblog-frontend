const fastify = require('fastify');
const Next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = fastify();

        server.get('/a/:number', (req, res) => {
            const queryParams = {number: req.params.number};
            console.log(queryParams);
            return app.render(req.req, res.res, '/article', queryParams)
        });

        server.get('/*', (req, res) => {
            return handle(req.req, res.res)
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        })
    });