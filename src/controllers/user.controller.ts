// user.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// create a new user 
export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    // Create the user in the database using Prisma
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
      },
    });
    // Send a success response back to the client
    res.status(201).json({ user: newUser });
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





export default { getUsers, getUserById, createNewUser};