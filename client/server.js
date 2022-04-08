const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const selfsigned = require("selfsigned");

const attributes = { name: "commonCertificate", value: "localhost" };
const sslMock = selfsigned.generate(attributes, { days: 365 });

const httpsOptions = {
  key: sslMock.private,
  cert: sslMock.cert,
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Server started on https://localhost:3000");
  });
});
