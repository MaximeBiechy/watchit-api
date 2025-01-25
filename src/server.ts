import app from './app/app.js';
import { config } from './config/config.js';
import logger from './shared/utils/logger.js';
import MongooseConnection from './infrastructure/database/MongooseConnection.js';

const PORT = config.PORT;

(async () => {
  try {
    await MongooseConnection.connect();

    app.listen(PORT, () => {
      logger.info(`[SERVER] Server is running at http://localhost:${PORT}`);
      logger.info(`[SERVER] API documentation is available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error: any) {
    logger.error('[SERVER] Server failed to start', error);
    process.exit(1);
  }
})();
