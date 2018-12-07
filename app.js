const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const err = require('koa-onerror');
const path = require('path');
const index = require('./routes/index');
const staticCache = require('koa-static-cache');

const app = new Koa();

// app.use(err());

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));

app.use(json());

app.use(logger());

app.use(staticCache(path.join(__dirname, '/public')));

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;