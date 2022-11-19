const express = require('express');
const next = require('next');
const compression = require('compression');
const port = parseInt(process.env.PORT, 10) || 3000
var cors = require('cors');
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const allowedOrigins = ['http://bvxtb.uz/'];


app.prepare().then(() => {
  const server = express()
  server.use(compression())
  server.use(express.static('public'))
  server.use(function (req, res, next) {
    req.url = req.originalUrl.replace('/nextjs_custom_server/_next', '/_next');
    next(); // be sure to let the next middleware handle the modified request. 
  });
  server.use(cors(cors.CorsOptions = {
    origin: allowedOrigins
  }));

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.all('*', (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Server ready on ${port}`)
  })
})