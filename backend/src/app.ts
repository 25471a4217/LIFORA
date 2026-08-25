import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { rateLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { router } from './routes/index.js';

const app = express();

app.use(pinoHttp());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use('/api/v1', router);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ success: true, data: { message: 'LIFORA backend is running' }, message: 'Success' });
});

export { app };