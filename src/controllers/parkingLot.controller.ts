// parkingLot.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all parking lots
export const getParkingLots = async (req: Request, res: Response) => {
    try {
        const parkingLots = await prisma.parkingLot.findMany();
        res.status(200).json({ parkingLots });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Fetch a single parking lot by ID
export const getParkingLotById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const parkingLot = await prisma.parkingLot.findUnique({
            where: { lot_id: parseInt(id) },
        });
        res.status(200).json({ parkingLot });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default { getParkingLots, getParkingLotById };