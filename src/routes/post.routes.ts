import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    commentPostController,
    createPostController,
    getAllPostsController,
    likePostController,

    removePostController
} from "../controllers/post.controller";
import { commentPostValidator, createPostValidator } from "../validators/post.validator";
import { validate } from "../middlewares/validation.middleware";
import { mongoIdValidator } from "../validators/common.validator";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   post:
 *      summary: Creacion de post
 *      tags:
 *       - Posts
 *      security:
 *          - bearerAuth: []
 *      requestBody:
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
 *      responses:
 *       201:
 *         description: Post creado con exito.
 */
router.post('/', authMiddleware, createPostValidator, validate, createPostController);

/**
 * @swagger
 * /api/posts:
 *   get:
 *      summary: Obtener todos los posts
 *      tags:
 *       - Posts
 *      parameters:
 *       - in: query
 *         name: page
 *         schema:
 *            type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *            type: integer
 *         required: false   
 *      responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/', getAllPostsController);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *      summary: Dar o quitar like a un post
 *      tags:
 *       - Posts
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *       200:
 *         description: Like actualizado
 */
router.post('/:postId/like', authMiddleware, mongoIdValidator("postId"), likePostController);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *      summary: Eliminar un post
 *      tags:
 *       - Posts
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *       200:
 *         description: Post eliminado
 *       401:
 *         description: No autorizado
 */
router.delete('/:postId', authMiddleware, mongoIdValidator("postId"),removePostController);

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
 *       201:
 *         description: Comentario agregado
 */
router.post('/:postId/comments', authMiddleware, mongoIdValidator("postId"), commentPostValidator, validate, commentPostController);

export default router;