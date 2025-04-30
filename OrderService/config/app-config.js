/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const ExpressConfigModule = require('./express-config');
const JWT = require('./../utils/jwt');

dotenv.config(); // Load environment variables from .env

class AppConfig {
  constructor(app) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      // Optional: Add logging or alerting here
    });
    this.app = app;
  }

  includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
    this.connectMongoDB(); // Add DB connection here
  }

  loadAppLevelConfig() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  loadExpressConfig() {
    new ExpressConfigModule(this.app).setAppEngine();
    new JWT(this.app).setJWTConfig();
  }

  connectMongoDB() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/order-service-db';

    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
  }
}

module.exports = AppConfig;
