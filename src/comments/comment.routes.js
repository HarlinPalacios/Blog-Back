import express from 'express';
import { createComment, getComment } from './comment.controller.js';

const router = express.Router();

router.post('/agregar', createComment);
router.get('/', getComment);

export default router;

