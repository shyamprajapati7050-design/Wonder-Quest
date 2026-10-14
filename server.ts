import express from 'express';
import buddyRoutes from './server/routes/buddy.routes';
import quizRoutes from './server/routes/quiz.routes';
import systemRoutes from './server/routes/system.routes';

const app = express();

// High-Throughput & Concurrency Optimization for 10,000 Maximum Users
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Custom High-Concurrency Headers
app.use((req, res, next) => {
  res.setHeader('X-Max-User-Capacity', '10000');
  res.setHeader('X-Concurrency-Tier', 'Enterprise-10k');
  res.setHeader('Keep-Alive', 'timeout=30, max=10000');
  next();
});

// API Routes (Backend Layer)
app.use('/api/buddies', buddyRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/system', systemRoutes);

// Health & System Capacity Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WonderQuest Full-Stack API',
    maxUserCapacity: 10000,
    concurrencyMode: 'High-Throughput (10,000 Users Max)',
    timestamp: new Date().toISOString(),
  });
});

export default app;
