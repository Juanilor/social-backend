import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import{
    create, getAll, like,
    remove
} from "../controllers/post.controller";

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', getAll);
router.post('/:postId/like',authMiddleware, like);
router.delete('/:postId', authMiddleware,remove);

export default router;