const fastify = require('fastify');
const Next = require('next');
const fs=require('fs')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = fastify();
        server.register(require('fastify-cors'))

        server.get('/a/:number', (req, res) => {
            const queryParams = {
                _type: 'article',
                number: req.params.number
            };

            return app.render(req.req, res.res, '/index', queryParams)
        });

        server.get('/p/:slug', (req, res) => {
            const queryParams = {
                _type: 'page',
                slug: req.params.slug
            };

            return app.render(req.req, res.res, '/index', queryParams)
        });

        server.get('/articles',(req,res)=>{
            return app.render(req.req, res.res, '/index', req.query)
        })

        server.get('/*', (req, res) => {
            return handle(req.req, res.res)
        });
        server.get('/config',(req,res)=>{
            const config=JSON.parse(fs.readFileSync('./config.json'))
            if(req.headers.authorization!==config.SECRET_KEY){
                res.code(401).send()
            }else{
                res.send(config)
            }
        })
        server.post('/config',(req,res)=>{
            const config=JSON.parse(fs.readFileSync('./config.json'))
            if(req.headers.authorization!==config.SECRET_KEY){
                res.code(401).send()
            }else{
                fs.writeFileSync('./config.json', JSON.stringify(req.body,null,2))
                res.send({message:'OK'})
            }
        })

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        })
    });