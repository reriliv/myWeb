/*const http = require("http");

http.createServer(function(request, response){
  response.writeHead(200, {"Content-Type":"text/html"});
  response.end("<h1>Hello World</h1>");
}).listen(3000);

console.log("Server running at 127.0.0.1:3000");*/

const Koa = require("koa2");
const router = require("koa-router")();
const fs = require("fs");
const staticFiles = require("./lib/static-files.js");
const app = new Koa();

app.use(async(ctx, next) => {
  console.log(ctx.method, ctx.url);
  await next();
});

/*router.get("/:name", async(ctx, next) => {
  ctx.response.body = fs.readFileSync(`${__dirname}/src/${ctx.params.name}.html`, "utf8");
});*/

app.use(staticFiles("/H5/", __dirname+'/H5'));

app.use(router.routes());

app.listen(3000);
console.log("Server running at 127.0.0.1:3000");