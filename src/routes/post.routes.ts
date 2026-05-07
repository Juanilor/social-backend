import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import{
    create, getAll, like
} from "../controllers/post.controller";

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', getAll);
router.post('/:postId/like',authMiddleware, like);

export default router;