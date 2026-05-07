import { Router } from "express";
import { body } from "express-validator";
import {validate} from "../middlewares/validation.middleware"


import { register, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/auth.controller";


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
 *       200:
 *         description: Registro exitoso
 */


router.post("/register",[

    body("username").notEmpty().withMessage("Username requerido."),
    body("email").isEmail().withMessage("Email invalido."),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres."),
], validate , register);

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

router.post("/login", [

    body("email").isEmail().withMessage("Email invalido"),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres.")

], validate, login);
router.get("/me", authMiddleware, getMe);

export default router;
