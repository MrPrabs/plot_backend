const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/schema', async (req, res) => {
  try {
    // Fetch the database schema
    const schema = await prisma.$queryRaw`SELECT * FROM information_schema.tables WHERE table_schema = 'public'`;
    res.json({ schema });
  } catch (error) {
    console.error('Error fetching schema:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
