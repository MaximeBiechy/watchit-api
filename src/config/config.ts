import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB: {
    MONGO_IP: process.env.MONGO_IP || 'mongo',
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_DB: process.env.MONGO_DB || 'watchit_dev',
    MONGO_USER: process.env.MONGO_INITDB_ROOT_USERNAME || 'root',
    MONGO_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD || 'password',
  },
};
