import express from 'express';
import { createPubli, getPublic, filtrar, addCourse } from './public.controller.js';

const router = express.Router();

/**
 * @swagger
 * /publics:
 *   get:
 *     summary: Get all publications
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get('/', getPublic);

/**
 * @swagger
 * /publics/{curso}:
 *   get:
 *     summary: Get publications by course
 *     parameters:
 *       - in: path
 *         name: curso
 *         required: true
 *         schema:
 *           type: string
 *         description: Course name
 *     responses:
 *       200:
 *         description: Publications filtered by course
 */
router.get('/:curso', filtrar);

/**
 * @swagger
 * /publics/crearPublic:
 *   post:
 *     summary: Create a new publication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               curso:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publication created successfully
 */
router.post('/crearPublic', createPubli);

router.post("/course", addCourse);

export default router;