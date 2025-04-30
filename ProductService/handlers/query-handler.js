'use strict';

class QueryHandler {
  constructor() {
    this.Mongodb = require('./../config/db');
    this.projectedKeys = {
      productId: true,
      userId: true,
      quantity: true,
      status: true,
      createdAt: true,
      _id: false,
      id: '$_id',
    };
  }

  createOrder(orderData) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        orderData.createdAt = new Date();
        orderData.status = 'PLACED';
        DB.collection('order').insertOne(orderData, (err, result) => {
          DBClient.close();
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getOrders() {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('order').aggregate([
          { $project: this.projectedKeys }
        ]).toArray((err, result) => {
          DBClient.close();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new QueryHandler();
