import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes"
import postRoutes from "./routes/post.routes"
import userRoutes from './routes/user.routes'
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Api Levantada");
});

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/users", userRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorMiddleware);
export default app;