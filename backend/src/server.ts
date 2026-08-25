import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';

async function start() {
  await connectDatabase();
  await connectRedis();
  app.listen(env.PORT, () => {
    console.log(`LIFORA backend listening on http://localhost:${env.PORT}`);
  });
}

start().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});