import express from 'express';
import dotenv from 'dotenv';
import router from './routers/router.js';
import morgan from 'morgan';
import cronJobs from './utils/cron/cronJobs.js';

dotenv.config();

/**
 * express module
 * @const
 */
const app = express();
const PORT = process.env.PORT;

// Run cron jobs
cronJobs.start();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use('/api', router);

// http.Server object
app.listen(PORT, () => {
  console.log(`We're live on http://localhost:${PORT}/`);
});