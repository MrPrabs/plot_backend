import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Create an Express application instance
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware to parse JSON request bodies
app.use(express.json());

// Define route for fetching database schema
app.get('/schema', async (req: Request, res: Response) => {
  try {
    // Fetch the database schema
    const schema = await prisma.$queryRaw`SELECT * FROM User`;
    res.json({ schema });
  } catch (error) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
