// parkingLots.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { convertAddressToCoordinates } from '../services/geocodingService';
import { parseCityFromAddress } from '../utils/addressUtils';
import { calculateDistance } from '../utils/distanceUtils';
import axios from 'axios';

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
    const { name, address, description, total_spots, spot_numbering, owner_id } = req.body;
  
    try {
      // Convert address to coordinates
      console.log('address', address)
      const { latitude, longitude } = await convertAddressToCoordinates(address);
      console.log('latitude', latitude)
  
      // Create parking lot with the obtained coordinates
      const newParkingLot = await prisma.parkingLot.create({
        data: {
          name,
          address,
          description: description || undefined,
          latitude,
          longitude,
          total_spots: parseInt(total_spots),
          spot_numbering: spot_numbering === 'true',
          owner_id: parseInt(owner_id),
        },
      })
      res.status(200).json({ newParkingLot });
      ;
  
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// export const getParkingSpotsInLot = async (req: Request, res: Response) => {
//     const { lot_id } = req.params;
  
//     try {
//       const spotsInLot = await prisma.parkingSpot.findMany({
//         where: { lot_id: parseInt(lot_id) },
//       });
  
//       res.status(200).json({ spotsInLot });
//     } catch (error) {
//       console.error('Error handling request:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

//   export const findClosestParkingLots = async (req: Request, res: Response) => {
//     const { address } = req.body;

//     try {
//         // Convert address to coordinates
//         const { latitude, longitude } = await convertAddressToCoordinates(address);

//         // Parse the address components to extract the city
//         const city = parseCityFromAddress(address);

//         // Query parking lots within the same city as the provided address
//         const parkingLotsInCity = await prisma.parkingLot.findMany({
//             where: {
//                 // Filter by city
//                 address: {
//                     contains: city, // Assuming the city name is contained in the address
//                 },
//             },
//         });

//         // Calculate distance for each parking lot using the Haversine formula
//         const parkingLotsWithDistance = parkingLotsInCity.map((lot) => {
//             const lotLatitude = lot.latitude;
//             const lotLongitude = lot.longitude;
//             const distance = calculateDistance(latitude, longitude, lotLatitude, lotLongitude);
//             return { ...lot, distance };
//         });

//         // Sort parking lots by distance in ascending order
//         parkingLotsWithDistance.sort((a, b) => a.distance - b.distance);

//         // Return the closest 50 parking lots
//         const closestParkingLots = parkingLotsWithDistance.slice(0, 50);

//         // Retrieve parking spots for each closest parking lot
//         const parkingSpotsInClosestLots = await Promise.all(
//             closestParkingLots.map(async (lot) => {
//                 const response = await axios.get(`you/parkinglots/${lot.lot_id}/parkingspots`);
//                 return { ...lot, parkingSpots: response.data.spotsInLot };
//             })
//         );

//         res.status(200).json({ closestParkingLots: parkingSpotsInClosestLots });
//     } catch (error) {
//         console.error('Error handling request:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
export default { getParkingLots, getParkingLotById, createParkingLot};
    // getParkingSpotsInLot, findClosestParkingLots};