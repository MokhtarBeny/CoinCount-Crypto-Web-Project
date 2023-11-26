import app from './app';
import logger from './utils/logger';
import osf from './utils/osf';
import database from './utils/database';
import dotenv from 'dotenv';
import { initializeCryptoDataFetch } from './controllers/cryptos';

dotenv.config();
const port = process.env.PORT || 3000;

// Initialize the scheduled task for fetching crypto data
initializeCryptoDataFetch();


app.listen(port, async () => {
  const networkIp = osf.getNetworkIp();
  console.clear();
  await database();
  logger.info(`Server running on port ${port}`);
  logger.info(`Local: http://localhost:${port}`);
  logger.info(`Network: http://${networkIp}:${port}`);
});
