import { Router } from "express";
import { validate } from "../middlewares/validation.middleware"


import { loginUserController, registerUserController, getMeUserController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginValidator, regiterValidator } from "../validators/auth.validator";


const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro exitoso
 */


router.post("/register", regiterValidator, validate, registerUserController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */

router.post("/login", loginValidator, validate, loginUserController);

/**
 *  @swagger
 * /api/auth/me:
 *  get:
 *      summary: Obtener usuario autenticado
 *      tags:
 *        - Auth
 *      security:
 *          - bearerAuth: []
 *      responses:
 *      200:
 *          description: Usuario autenticado
 *      400:
 *          description: No autorizado
 *      
 */

router.get("/me", authMiddleware, getMeUserController);

export default router;
