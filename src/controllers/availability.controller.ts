// availability.controller.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { convertAddressToCoordinates } from '../services/geocodingService';
import { calculateDistance } from '../utils/distanceUtils';

const prisma = new PrismaClient();
export const getAllAvailableSpots = async (req: Request, res: Response) => {
    try {
      // Query all spots in the availability table
      const allAvailableSpots = await prisma.spotAvailability.findMany();
  
      res.status(200).json({ allAvailableSpots });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
export const findAvailableSpots = async (req: Request, res: Response) => {
    const { address, startTime, endTime } = req.body;
  
    try {
      // Convert address to coordinates
      const { latitude, longitude } = await convertAddressToCoordinates(address);
  
      // Query available spots within the specified time frame
      const availableSpots = await prisma.spotAvailability.findMany({
        where: {
          AND: [
            {
              start_time: { lte: startTime }, // Spot availability starts before or at the same time as requested end time
              end_time: { gte: endTime }, // Spot availability ends after or at the same time as requested start time
            },
            {
              parkingSpot: {
                lot: {
                  // You may further filter based on the location (latitude and longitude) if needed
                  // Example: latitude: { gte: latitude - threshold, lte: latitude + threshold },
                  //          longitude: { gte: longitude - threshold, lte: longitude + threshold }
                }
              }
            }
          ]
        },
        include: {
          parkingSpot: true // Include related parking spot details
        }
      });
  
      // Calculate distance for each spot using the Haversine formula
      const spotsWithDistance = await Promise.all(availableSpots.map(async (spot) => {
        const spotLotId = spot.parkingSpot.lot_id;
        const parkingLot = await prisma.parkingLot.findUnique({
          where: { lot_id: spotLotId },
        });
  
        // Check if parking lot exists
        if (parkingLot) {
          const spotLatitude = parkingLot.latitude;
          const spotLongitude = parkingLot.longitude;
          const distance = calculateDistance(latitude, longitude, spotLatitude, spotLongitude);
          return { ...spot, distance };
        } else {
          // Handle case where parking lot is null
          console.error('Parking lot not found for spot:', spot);
          return null; // Or handle this case according to your requirements
        }
      }));
  
      // Filter spots by distance and remove null elements
      const maxDistance = 10; // Example maximum distance in kilometers
      const nearbySpots = spotsWithDistance
        .filter((spot) => spot !== null && spot.distance <= maxDistance)
        .map((spot) => spot!); // Since we've filtered out nulls, we can safely use ! to assert non-null
  
      res.status(200).json({ nearbySpots });
    }
    catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
  
  
export default { findAvailableSpots, getAllAvailableSpots };
