import request from "supertest";
import app from "../app";
import { createAndLoginUser } from "./helpers/auth.helper";
import { log } from "node:console";


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
    })
    
    it("Should not follow yourself", async () => {
        
        const user1 = await createAndLoginUser();
        
        const follow = await request(app).post(`/api/users/${user1._id}/follow`).set("Authorization", `Bearer ${user1.token}`);
        
        expect(follow.status).toBe(400);
        
    })
    
    
    it("Should return 404 for invalid user", async () =>{
        
        const user1 = await createAndLoginUser();
        
        const fakeId = "507f1f77bcf86cd799439011";

        const follow = await request(app).post(`/api/users/${fakeId}/follow`).set("Authorization", `Bearer ${user1.token}`);
        
        expect(follow.status).toBe(404);


    })

    it("Should require authorization", async () => {

        const user = await createAndLoginUser();

        const follow = await request(app).post(`/api/users/${user.user._id}/follow`);

        log(follow)

        expect(follow.status).toBe(401);

    })




});