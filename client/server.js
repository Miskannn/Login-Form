const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();
const selfsigned = require("selfsigned");
const helmet = require("helmet")

const attributes = { name: "commonCertificate", value: "localhost" };
const sslMock = selfsigned.generate(attributes, { days: 365 });

const enableHelmet = helmet({
  contentSecurityPolicy: {
    directives: {
      'default-src': [ "'self'" ],
      'base-uri': [ "'self'" ],
      'block-all-mixed-content': [],
      'font-src': [ "'self'", 'https:', 'data:' ],
      'form-action': [ "'self'" ],
      'frame-ancestors': [ "'self'" ],
      'img-src': [ "'self'", 'data:' ],
      'object-src': [ "'none'" ],
      'script-src': process.env.NODE_ENV === "development" ? [ "'self'", "'unsafe-eval'" ] : ["'self'"],
      'style-src': [ "'self'", 'https:', "'unsafe-inline'" ],
      'upgrade-insecure-requests': [],
    }
  }
});

const httpsOptions = {
  key: sslMock.private,
  cert: sslMock.cert,
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    enableHelmet(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end(
          "Helmet failed for some unexpected reason. Was it configured correctly?"
        );
      }
    });
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("Server started on https://localhost:3000");
  });
});
