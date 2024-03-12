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

// // Fetch a single parking spot by ID
export const getParkingSpotById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const parkingSpot = await prisma.parkingSpot.findUnique({
            where: { spot_id: parseInt(id) },
        });
        res.status(200).json({ parkingSpot });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// create a new parking spot
// model ParkingSpot {
//   spot_id            Int                 @id @default(autoincrement())
//   lot_id             Int
//   spot_number        Int?
//   reservable         Boolean
//   description        String?
//   price              Float
//   lot                ParkingLot          @relation(fields: [lot_id], references: [lot_id])
//   reservations       Reservation[]
//   is_reserved    Boolean                 @default(false)
//   subleaseAgreements SubleaseAgreement[]
//   availabilities     SpotAvailability[]
// }

export const createParkingSpot = async (req: Request, res: Response) => {
    const { lot_id, spot_number, reservable, description, price } = req.body;
    try {
        const data: any = {
            lot_id: parseInt(lot_id),
            reservable: reservable === 'true',
            description: description || undefined,
            price: parseFloat(price),
        };

        // Add spot_number to data object if provided
        if (spot_number) {
            data.spot_number = parseInt(spot_number);
        }

        const newParkingSpot = await prisma.parkingSpot.create({
            data: data,
        });
        res.status(201).json({ message: 'Parking spot created successfully', parkingSpot: newParkingSpot });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}





export default { getParkingSpots, getParkingSpotById, createParkingSpot };


    