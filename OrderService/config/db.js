const mongodb = require('mongodb');
const redis = require('redis');

class MongoDB {
  constructor() {
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectId;
    this.client = null;
    this.db = null;
  }

  onConnect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        console.log("Using existing database connection");
        resolve([this.db, this.ObjectID]);
      } else {
        const dbUrl = process.env.MONGODB_DB_URL;
        const dbName = process.env.MONGODB_DB_NAME;

        this.mongoClient.connect(
          dbUrl,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
          (err, client) => {
            if (err) {
              console.error("Failed to connect to MongoDB:", err);
              reject(err);
            } else {
              console.log("Connected to MongoDB successfully");
              this.client = client;
              this.db = client.db(dbName); // Use from .env
              resolve([this.db, this.ObjectID]);
            }
          }
        );
      }
    });
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error('Database not connected yet!');
    }
    return this.db.collection(collectionName);
  }
}

module.exports.MongoDB = new MongoDB();
module.exports.redisClient = redis.createClient();
