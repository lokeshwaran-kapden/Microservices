const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
const publicRoutes = require('./jwt-route'); // import the routes

class JWT {
  constructor(app) {
    this.app = app;
  }

  setJWTConfig() {
    this.app.use(
      expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],  // Adjusted to support proper JWT algorithms
      }).unless({
        path: publicRoutes, // skip JWT verification for routes in publicRoutes
      }),
    );

    // Error handling for invalid JWT
    this.app.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        return res.status(401).send('Invalid or missing token');
      }
      next(err); // Pass to other error handlers
    });
  }
}

module.exports = JWT;
