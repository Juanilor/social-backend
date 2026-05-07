import { Router } from "express";
import { body } from "express-validator";
import {validate} from "../middlewares/validation.middleware"


import { register, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/auth.controller";


const router = Router();

router.post("/register",[

    body("username").notEmpty().withMessage("Username requerido."),
    body("email").isEmail().withMessage("Email invalido."),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres."),
], validate , register);
router.post("/login", [

    body("email").isEmail().withMessage("Email invalido"),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres.")

], validate, login);
router.get("/me", authMiddleware, getMe);

export default router;
