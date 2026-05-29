import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { follow } from "../controllers/user.controller";

const router = Router();

router.post("/:id/follow", authMiddleware, follow);

export default router;