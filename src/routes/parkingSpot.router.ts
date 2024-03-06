// parkingSpot.router.ts
import { Router } from 'express'; 
import parkingSpotController from '../controllers/parkingSpotController';

const parkingSpotRouter = Router();

// Route for getting all parking spots
parkingSpotRouter.get('/', parkingSpotController.getParkingSpots);

// Route for getting a single parking spot by its ID
parkingSpotRouter.get('/:id', parkingSpotController.getParkingSpotById);

// Route for creating a new parking spot
// parkingSpotRouter.post('/', parkingSpotController.createParkingSpot);

export default parkingSpotRouter;
