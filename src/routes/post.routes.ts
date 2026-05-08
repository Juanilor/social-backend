import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    create, getAll, like,
    remove
} from "../controllers/post.controller";

const router = Router();

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Creacion de Post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                  type: string
 *             required: 
 *              - content
 *     responses:
 *       200:
 *         description: Post creado con exito.
 */
router.post('/', authMiddleware, create);
router.get('/', getAll);
router.post('/:postId/like', authMiddleware, like);
router.delete('/:postId', authMiddleware, remove);

export default router;