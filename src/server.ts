import app from './app/app.js';
import { config } from './config/config.js';
import * as mongoose from 'mongoose';
import logger from './shared/utils/logger.js';

const PORT = config.PORT;

// TODO: Move this from here
const mongoURL = `mongodb://${config.DB.MONGO_IP}:${config.DB.MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info('[MONGO] Connection established successfully');
  })
  .catch((err: any) => {
    logger.error('[MONGO] Connection failed', err);
  });
// END TODO

app.listen(PORT, () => {
  logger.info(`[SERVER] Server is running at http://localhost:${PORT}`);
  logger.info(`[SERVER] API documentation is available at http://localhost:${PORT}/api-docs`);
});
