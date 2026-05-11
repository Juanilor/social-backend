import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    comment,
    create, getAll, like,
    remove
} from "../controllers/post.controller";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Creacion de Post
 *     tags:
 *       - Posts
 *      security:
 *          - bearerAuth: []
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
 *               - content
 *     responses:
 *       201:
 *         description: Post creado con exito.
 */
router.post('/', authMiddleware, create);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Dar o quitar like a un post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like actualizado
 */
router.post('/:postId/like', authMiddleware, like);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Eliminar un post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post eliminado
 *       401:
 *         description: No autorizado
 */
router.delete('/:postId', authMiddleware, remove);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Agregar comentario a un post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario agregado
 */
router.post('/:postId/comments',authMiddleware,comment);

export default router;