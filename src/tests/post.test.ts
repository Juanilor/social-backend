import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";

describe("Post Routes", () => {

    it("Should create a new post", async () => {

        const token = await createAndLoginUser();

        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token.token}`)
            .send({ content: "TEST CONTENT." });

        expect(response.status).toBe(201);

        expect(response.body.data).toHaveProperty("author");

        expect(response.body.data.content).toBe("TEST CONTENT.")
    }, 10000);


    it("Should fail without token", async () => {

        const response = await request(app)
            .post("/api/posts")
            .send({ content: "TEST CONTENT WITHOUT TOKEN" });

        expect(response.status).toBe(401);

    }, 10000);

    it("Should not delete another user's post", async () => {
        const tokenUser1 = await createAndLoginUser();

        const postResponse = await request(app).post("/api/posts").set("Authorization", `Bearer ${tokenUser1.token}`).send({ content: "PRIVATE POST" });

        const tokenUser2 = await createAndLoginUser();

        const response = await request(app).delete(`/api/posts/${postResponse.body.data._id}`).set("Authorization", `Bearer ${tokenUser2.token}`);

        expect(response.status).toBe(403);
    }, 10000)


    it("Should comment on a post", async () => {

        const user = await createAndLoginUser();

        const postResponse = await request(app).post('/api/posts').set("Authorization", `Bearer ${user.token}`).send({ content: "COMMENTED POST" });

        const response = await request(app).post(`/api/posts/${postResponse.body.data._id}/comments`).set("Authorization", `Bearer ${user.token}`).send({ content: "POST COMMENTARY" });

        expect(response.status).toBe(201);

        expect(response.body.data.comments).toHaveLength(1);

        expect(response.body.data.comments[0].content).toBe("POST COMMENTARY");


    }, 10000);


    it("Should like a post", async () => {

        const user = await createAndLoginUser();

        const postResponse = await request(app).post('/api/posts').set("Authorization", `Bearer ${user.token}`).send({ content: "LIKEABLE POST" });

        const response = await request(app).post(`/api/posts/${postResponse.body.data._id}/like`).set("Authorization", `Bearer ${user.token}`);

        expect(response.status).toBe(200);

        expect(response.body.data.likes).toHaveLength(1);
    }, 10000);


    it("Should unlike a post", async () => {

        const user = await createAndLoginUser();

        const postResponse = await request(app).post('/api/posts').set("Authorization", `Bearer ${user.token}`).send({ content: "TOGGLE LIKE POST" });

        await request(app).post(`/api/posts/${postResponse.body.data._id}/like`).set("Authorization", `Bearer ${user.token}`);

        const response = await request(app).post(`/api/posts/${postResponse.body.data._id}/like`).set("Authorization", `Bearer ${user.token}`);

        expect(response.status).toBe(200);

        expect(response.body.data.likes).toHaveLength(0);


    }, 10000)

    it("Should paginate posts", async () => {

        const user = await createAndLoginUser();

        for (let i = 0; i < 10; i++) {
            await request(app).post('/api/posts').set("Authorization", `Bearer ${user.token}`).send({ content: `Pagination Test, post ${i}` });
        }

        const response = await request(app).get('/api/posts?page=1&limit=2');

        expect(response.status).toBe(200);
        expect(response.body.data.posts).toHaveLength(2);
        expect(response.body.data).toHaveProperty('totalPages');


    }, 10000);

});