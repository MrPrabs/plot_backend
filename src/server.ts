import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import userRouter from './routes/user.router';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Create an Express application instance
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the userRouter at the /users path
app.use('/users', userRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
