// app.js
import express from 'express';
// import authRoutes from './routes/authRoutes';
// import authRoutes from "./routes/authRoutes"/

import authRoutes from "./src/routes/authRoute.js"
import bankRoutes from './src/routes/bankRoute.js';
 import transactionRoutes from './src/routes/transactionRoute.js';
 import { handleWebhook } from './src/utils/webhookHandler.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/transactions', transactionRoutes);
app.post('/webhook', handleWebhook);

export default app;
