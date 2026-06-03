import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";

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

})
