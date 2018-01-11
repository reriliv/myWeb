const fs = require("fs");

let hello = (ctx) => {
  ctx.response.body = fs.readFileSync(`${__dirname}`);
}

module.exports = {
  "HELLO": hello
};