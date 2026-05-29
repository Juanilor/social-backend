import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { follow } from "../controllers/user.controller";
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

export default router;