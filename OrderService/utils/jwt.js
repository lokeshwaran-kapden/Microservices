const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
const publicRoutes = require('./jwt-route');

class JWT {
  constructor(app) {
    this.app = app;
  }

  setJWTConfig() {
    this.app.use(
      expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'], // Adding the algorithms field
      }).unless({
        path: publicRoutes,
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
