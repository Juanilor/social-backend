import request from "supertest";
import app from "../app";
import { createLoginAndGetUser } from "./helpers/auth.helper";

describe("User Routes", () => {

    it("Should follow another user", async () => {

        const user1 = await createLoginAndGetUser();
        const user2 = await createLoginAndGetUser();
                
        const response = await request(app).post(`/api/users/${user2.body.data.user._id}/follow`).set("Authorization", `Bearer ${user1.body.data.token}`);
        
        expect(response.status).toBe(200);

        expect(response.body.data.following).toBe(true);

    }, 10000)


})