const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
var bodyParser = require("koa-bodyparser");
const Next = require("next");
const fs = require("fs");
const axios = require("axios");
const https = require("https");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = Next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  server.use(cors());
  server.use(bodyParser());
  const router = new Router();

  router.get("/a/:number", async ctx => {
    let number = ctx.params.number;
    const queryParams = {
      _type: "article",
      number
    };
    var view_count_article_numbers = ctx.cookies.get(
      "view_count_article_numbers"
    );
    if (!view_count_article_numbers) {
      view_count_article_numbers = [];
    } else {
      view_count_article_numbers = JSON.parse(view_count_article_numbers);
    }
    if (!view_count_article_numbers.includes(number)) {
      const config = JSON.parse(fs.readFileSync("./config.json"));
      axios({
        url: `https://127.0.0.1:5000/api/article/${number}/viewCount`,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          Authorization: config.REST_SECRET_KEY
        }
      });
      view_count_article_numbers.push(number);
      ctx.cookies.set(
        "view_count_article_numbers",
        JSON.stringify(view_count_article_numbers)
      );
    }

    await app.render(ctx.req, ctx.res, "/index", queryParams);
    ctx.respond = false;
  });

  router.get("/p/:slug", async ctx => {
    const queryParams = {
      _type: "page",
      slug: ctx.params.slug
    };

    await app.render(ctx.req, ctx.res, "/index", queryParams);
    ctx.respond = false;
  });

  router.get("/articles", async ctx => {
    await app.render(ctx.req, ctx.res, "/index", ctx.query);
    ctx.respond = false;
  });

  router.get("/config", async ctx => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    if (ctx.request.headers.Authorization !== config.SECRET_KEY) {
      ctx.status = 401;
    } else {
      ctx.body = config;
    }
  });
  router.post("/config", async ctx => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    if (ctx.request.headers.Authorization !== config.SECRET_KEY) {
      ctx.status = 401;
    } else {
      fs.writeFileSync(
        "./config.json",
        JSON.stringify(ctx.request.body, null, 2)
      );
      ctx.body = { message: "OK" };
    }
  });
  router.get("/attachments/:filename", async ctx => {
    ctx.redirect(`https://127.0.0.1:5000/attachments/${ctx.params.filename}`);
  });
  router.get("/*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  server.use(router.routes());
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
