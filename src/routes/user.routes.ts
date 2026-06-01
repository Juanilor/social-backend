import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { follow, followers, following, profile } from "../controllers/user.controller";
import { followValidator } from "../validators/user.validator";
import { validate } from "../middlewares/validation.middleware";


const router = Router();


/**
 * @swagger
 * /api/users/{id}/follow:
 *   post:
 *     summary: Seguir o dejar de seguir usuario
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true   
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow actualizado
 */

router.post("/:id/follow", authMiddleware, followValidator, validate, follow);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener perfil publico de un usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 */

router.get("/:id", followValidator, validate, profile)

/**
 * @swagger
 * /api/users/{id}/followers:
 *   get:
 *     summary: Obtener lista de perfiles que siguen al usuario objetivo.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfiles obtenidos correctamente
 *       404:
 *         description: Usuarios no encontrados
 */

router.get("/:id/followers", followValidator, validate, followers);

/**
 * @swagger
 * /api/users/{id}/following:
 *   get:
 *     summary: Obtener lista de perfiles que el usuario objetivo sigue.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfiles obtenidos correctamente
 *       404:
 *         description: Usuarios no encontrados
 */

router.get("/:id/following", followValidator, validate, following);

export default router;