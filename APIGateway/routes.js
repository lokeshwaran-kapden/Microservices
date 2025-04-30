const httpProxy = require('express-http-proxy');

const userServiceProxy = httpProxy('http://localhost:3001');
const productServiceProxy = httpProxy('http://localhost:3002');
const orderServiceProxy = httpProxy('http://localhost:3003');

class Routes {
  constructor(app) {
    this.app = app;
  }

  /* Creating app routes */
  appRoutes() {
    // USER ROUTES
    this.app.get('/', (req, res) => {
      res.send('API Gateway is running');
    });
    
    this.app.get('/api/users', (req, res) => {
      req.url = '/user';  // Assuming user-service exposes GET /user
      userServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    this.app.get('/api/users/:userId', (req, res) => {
      req.url = `/user/${req.params.userId}`;
      userServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    this.app.post('/api/users/register', (req, res) => {
      req.url = '/register';
      userServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    this.app.post('/api/users/login', (req, res) => {
      req.url = '/login';
      userServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    // PRODUCT ROUTES
    this.app.get('/api/products/:productId', (req, res) => {
      req.url = `/product/${req.params.productId}`;
      productServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    this.app.get('/api/products', (req, res) => {
      req.url = '/product';
      productServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    // ORDER ROUTES
    this.app.get('/api/orders', (req, res) => {
      req.url = '/order';
      orderServiceProxy(req, res, (err) => this.handleError(err, res));
    });

    this.app.post('/api/orders', (req, res) => {
      req.url = '/order';
      orderServiceProxy(req, res, (err) => this.handleError(err, res));
    });
  }

  // Error handling for proxy requests
  handleError(err, res) {
    console.error('Proxy error:', err);
    if (err && err.statusCode === 404) {
      res.status(404).json({ message: 'Not found.' });
    } else {
      res.status(500).json({ message: 'Something went wrong with the service.' });
    }
  }

  routesConfig() {
    this.appRoutes();
  }
}

module.exports = Routes;
