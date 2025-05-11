import express from 'express';
import { createPubli, getPublic, filtrar} from './public.controller.js';

const router = express.Router();

router.get('/:curso', filtrar)
router.get('/', getPublic);
router.post('/crearPublic', createPubli);

export default router;


