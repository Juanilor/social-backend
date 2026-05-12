import request from "supertest";
import app from "../app";


describe("Auth Routes", () => {
    it("Should register a new user", async () => {
        const response = await request(app)
        .post("/api/auth/register")
        .send({
            username: `testUser${Date.now()}`, 
            email: `test${Date.now()}@test.com`, 
            password: "123456",
        });

        expect(response.status).toBe(201);
    }, 10000);
});