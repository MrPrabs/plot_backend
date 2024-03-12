// parkingLots.controller.ts
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

// create a new parking lot 
// model ParkingLot {
//     lot_id         Int           @id @default(autoincrement())
//     name           String
//     address        String
//     description    String?
//     latitude       Float
//     longitude      Float
//     total_spots    Int
//     spot_numbering Boolean
//     owner_id       Int
//     owner          User          @relation("lotOwner", fields: [owner_id], references: [user_id])
//     parkingSpots   ParkingSpot[]
//     reviews        Review[]
//   }
// Create a new parking lot
export const createParkingLot = async (req: Request, res: Response) => {
    const { name, address, description, latitude, longitude, total_spots, spot_numbering, owner_id } = req.body;
    try {
        const newParkingLot = await prisma.parkingLot.create({
            data: {
                name,
                address,
                description: description || undefined,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                total_spots: parseInt(total_spots),
                spot_numbering: spot_numbering === 'true',
                owner_id: parseInt(owner_id),
            },
        });
        res.status(201).json({ message: 'Parking lot created successfully', parkingLot: newParkingLot });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default { getParkingLots, getParkingLotById, createParkingLot};