import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";

describe("Post Routes", () => {

    it("Should create a new post", async () => {

        const token = await createAndLoginUser();

        console.log(token);

        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({ content: "TEST CONTENT." });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("_id");

        expect(response.body.content).toBe("TEST CONTENT.")
    }, 10000);


    it("Should fail without token", async () => {

        const response = await request(app)
            .post("/api/posts")
            .send({ content: "TEST CONTENT WITHOUT TOKEN" });

        expect(response.status).toBe(401);

    }, 10000);

    it("Should not delete another user's post", async () => {
        const tokenUser1 = await createAndLoginUser();

        const postResponse = await request(app).post("/api/posts").set("Authorization", `Bearer ${tokenUser1}`).send({ content: "PRIVATE POST" });

        const tokenUser2 = await createAndLoginUser();

        const response = await request(app).delete(`/api/posts/${postResponse.body._id}`).set("Authorization", `Bearer ${tokenUser2}`);

        expect(response.status).toBe(403);
    }, 10000)


    it("Should comment on a post", async () => {

        const token = await createAndLoginUser();

        const postResponse = await request(app).post('/api/posts').set("Authorization", `Bearer ${token}`).send({ content: "COMMENTED POST" });
        
        const response = await request(app).post(`/api/posts/${postResponse.body._id}/comments`).set("Authorization", `Bearer ${token}`).send({ content: "POST COMMENTARY" });
        
        expect(response.status).toBe(201);
        
        expect(response.body.comments).toHaveLength(1);
        
        expect(response.body.comments[0].content).toBe("POST COMMENTARY");
        
        
    }, 10000);
    
    
    it("Should like a post", async () => {
        
        const token = await createAndLoginUser();
        
        const postResponse = await request(app).post('/api/posts').set("Authorization", `Bearer ${token}`).send({ content: "LIKEABLE POST" });
        
        const response = await request(app).post(`/api/posts/${postResponse.body._id}/like`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        
        expect(response.body.likes).toHaveLength(1);
    })
});