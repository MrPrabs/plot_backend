// parkingLot.router.ts
import { Router } from 'express';
import parkingLotController from '../controllers/parkingLot.controller';

const parkingLotRouter = Router();

// Route for getting all parking lots
parkingLotRouter.get('/', parkingLotController.getParkingLots);

// Route for getting a single parking lot by its ID
parkingLotRouter.get('/:id', parkingLotController.getParkingLotById);

// Route for creating a new parking lot
parkingLotRouter.post('/', parkingLotController.createParkingLot);

export default parkingLotRouter;
