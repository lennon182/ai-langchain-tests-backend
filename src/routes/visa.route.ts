import { Router } from 'express'
import { visaController } from '../controllers/visa.controllers';

const router = Router();

// ROUTES
router.post('/talk-with-page', visaController )

export default router;
