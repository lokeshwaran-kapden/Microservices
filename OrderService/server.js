/* eslint-disable no-console */
const express = require('express');
const http = require('http');

const AppConfig = require('./config/app-config');
const Routes = require('./routes');

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  startTheServer() {
    this.appConfig();


    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'UP' });
    });
    
    this.includeRoutes();

    const port = process.env.NODE_SERVER_PORT || 3003;
    const host = process.env.NODE_SERVER_HOST || '0.0.0.0';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

module.exports = new Server();
