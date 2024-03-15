// availability.router.ts
import express from 'express';
import { findAvailableSpots } from '../controllers/availability.controller';
import { getAllAvailableSpots} from '../controllers/availability.controller';

const router = express.Router();

router.get('/', getAllAvailableSpots);
router.post('/available-spots', findAvailableSpots);


export default router;