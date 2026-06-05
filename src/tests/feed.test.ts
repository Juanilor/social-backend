import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";
import { log } from "node:console";

describe("Feed Routes", () => {

    it("Should return following user post", async () => {

        const user1 = await createAndLoginUser();
        const user2 = await createAndLoginUser();

        await request(app).post("/api/posts").set("Authorization", `Bearer ${user2.token}`).send({ content: "FEED TEST POST" })

        await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        const feedResponse = await request(app).get("/api/posts/feed").set('Authorization', `Bearer ${user1.token}`);


        expect(feedResponse.status).toBe(200);

        expect(feedResponse.body.data.posts).toHaveLength(1);

        expect(feedResponse.body.data.posts[0].content).toBe("FEED TEST POST");

    }, 10000);


    it("Should return empty feed", async () => {

        const user = await createAndLoginUser();


        const response = await request(app).get("/api/posts/feed").set('Authorization', `Bearer ${user.token}`);


        expect(response.status).toBe(200);

        expect(response.body.data.posts).toHaveLength(0);

    }, 10000)



    it("Should paginate feed posts", async () => {

        const user = await createAndLoginUser();

        for (let i = 0; i < 10; i++) {
            await request(app).post('/api/posts').set("Authorization", `Bearer ${user.token}`).send({ content: `Pagination feed Test, post ${i}` });
        }

        const response = await request(app).get('/api/posts/feed?page=1&limit=2').set("Authorization", `Bearer ${user.token}`);

        log(response)

        expect(response.status).toBe(200);

        expect(response.body.data.posts).toHaveLength(2);
        expect(response.body.data).toHaveProperty("totalPages");
        expect(response.body.data.totalPages).toBe(5);

    }, 10000);
})
