import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";


describe("User Routes", () => {

    it("Should follow another user", async () => {

        const user1 = await createAndLoginUser();
        const user2 = await createAndLoginUser();

        const follow = await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        expect(follow.status).toBe(200);

        expect(follow.body.data.following).toBe(true);

    }, 10000);

    it("Should unfollow another user", async () => {


        const user1 = await createAndLoginUser();
        const user2 = await createAndLoginUser();

        const follow = await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        expect(follow.status).toBe(200)
        expect(follow.body.data.following).toBe(true);

        const unfollow = await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        expect(unfollow.status).toBe(200);
        expect(unfollow.body.data.following).toBe(false);
    }, 10000)

    it("Should not follow yourself", async () => {

        const user1 = await createAndLoginUser();

        const follow = await request(app).post(`/api/users/${user1._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        expect(follow.status).toBe(400);

    }, 10000)


    it("Should return 404 for invalid user", async () => {

        const user1 = await createAndLoginUser();

        const fakeId = "507f1f77bcf86cd799439011";

        const follow = await request(app).post(`/api/users/${fakeId}/follow`).set("Authorization", `Bearer ${user1.token}`);

        expect(follow.status).toBe(404);


    }, 10000)

    it("Should require authorization", async () => {

        const user = await createAndLoginUser();

        const follow = await request(app).post(`/api/users/${user.user._id}/follow`);

        expect(follow.status).toBe(401);

    }, 10000)


    it("Should get user profile", async () => {

        const user = await createAndLoginUser();


        const response = await request(app).get(`/api/users/${user.user._id}`);

        const data = response.body.data;

        expect(response.status).toBe(200);

        expect(data).toHaveProperty("username");
        expect(data).toHaveProperty("followerCount");

    }, 10000)


    it("Should get followers list", async () => {

        const user1 = await createAndLoginUser();
        const user2 = await createAndLoginUser();

        await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        const response = await request(app).get(`/api/users/${user2.user._id}/followers`);

        expect(response.status).toBe(200);

        expect(response.body.data.followers).toHaveLength(1);

    }, 10000);

    it("Should get following list", async () => {

        const user1 = await createAndLoginUser();
        const user2 = await createAndLoginUser();

        await request(app).post(`/api/users/${user2.user._id}/follow`).set("Authorization", `Bearer ${user1.token}`);

        const response = await request(app).get(`/api/users/${user1.user._id}/following`);

        expect(response.status).toBe(200);

        expect(response.body.data.following).toHaveLength(1);

    }, 10000);


});