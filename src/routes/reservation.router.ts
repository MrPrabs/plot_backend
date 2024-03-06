// reservation.router.ts
import { Router } from 'express';
import reservationController from '../controllers/reservation.controller';

const reservationRouter = Router();

// Route for getting all reservations
reservationRouter.get('/', reservationController.getReservations);

// Route for getting a single reservation by its ID
reservationRouter.get('/:id', reservationController.getReservationById);

export default reservationRouter;
