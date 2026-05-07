import express  from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes"
import postRoutes from "./routes/post.routes"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api Levantada");
});

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);


app.use(errorMiddleware);
export default app;