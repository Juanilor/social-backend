import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validation.middleware"


import { register, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/auth.controller";
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


router.post("/register", regiterValidator, validate, register);

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

router.post("/login", loginValidator, validate, login);

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

router.get("/me", authMiddleware, getMe);

export default router;
