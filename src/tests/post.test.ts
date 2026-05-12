import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";

describe("Post Routes", () => {

    it("Should create a new post", async () => {

        const token = await createAndLoginUser();

        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({ content: "TEST CONTENT." });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("_id");

        expect(response.body.content).toBe("TEST CONTENT.")
    }, 10000);
});