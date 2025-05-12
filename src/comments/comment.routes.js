import express from 'express';
import { createComment, getComment } from './comment.controller.js';

const router = express.Router();

/**
 * @swagger
 * /comments/agregar:
 *   post:
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               comment:
 *                 type: string
 *               publicationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 */
router.post('/agregar', createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/', getComment);

export default router;