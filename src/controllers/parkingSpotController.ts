// parkingSpot.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// // Fetch all parking spots
export const getParkingSpots = async (req: Request, res: Response) => {
    try {
        const parkingSpots = await prisma.parkingSpot.findMany();
        res.status(200).json({ parkingSpots });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default { getParkingSpots };


    