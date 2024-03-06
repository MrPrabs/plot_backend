// reservation.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all reservations
export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a single reservation by ID

export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { reservation_id: parseInt(id) },
    });
    res.status(200).json({ reservation });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { getReservations, getReservationById};