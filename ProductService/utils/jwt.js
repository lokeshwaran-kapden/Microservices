const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
const publicRoutes = require('./jwt-route'); // import the updated public routes

class JWT {
  constructor(app) {
    this.app = app;
  }

  setJWTConfig() {
    this.app.use(
      expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],  // Adjust to ensure the correct algorithm is used
      }).unless({
        path: publicRoutes, // Skip JWT verification for the routes in the publicRoutes array
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
