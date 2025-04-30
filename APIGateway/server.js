const express = require('express');
const http = require('http');
const cors = require('cors');
const Routes = require('./routes');
const morgan = require('morgan'); // for logging requests

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);

    this.app.use(cors({
      origin: 'http://localhost:3000', // Adjust to your frontend's URL
    }));
    this.app.use(express.json());
    this.app.use(morgan('dev')); // logging incoming requests
  }

  includeRoutes() {
    new Routes(this.app).routesConfig();
  }

  startTheServer() {
    const port = process.env.NODE_SERVER_PORT || 8000;
    const host = process.env.NODE_SERVER_HOST || '0.0.0.0';

    this.http.listen(port, host, () => {
      console.log(`API Gateway listening on http://${host}:${port}`);
    });
  }
}

module.exports = new Server();
