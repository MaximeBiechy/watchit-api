import mongoose from 'mongoose';
import logger from '../../shared/utils/logger.js';
import { config } from '../../config/config.js';

class MongooseConnection {
  static async connect(): Promise<void> {
    const mongoURL =
      `mongodb://${config.DB.MONGO_USER}:${config.DB.MONGO_PASSWORD}@${config.DB.MONGO_IP}:${config.DB.MONGO_PORT}` || '';
    try {
      await mongoose.connect(mongoURL, {
        dbName: config.DB.MONGO_DB,
      });
      logger.info('[MONGO] Connection established successfully');
    } catch (error: any) {
      logger.error('[MONGO] Connection failed', error);
    }
  }
}

export default MongooseConnection;
