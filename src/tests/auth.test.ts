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

        expect(response.body.data).toHaveProperty("token");

        expect(response.body.data.user).toHaveProperty("_id");

        expect(response.body.data.user.email).toContain("@test.com");


    }, 10000);

    it("Should login user", async () => {
        const email = `test${Date.now()}@test.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                username: "testUser",
                email,
                password: "123456",
            });

        const response = await request(app).post("/api/auth/login").send({ email, password: '123456', });

        expect(response.status).toBe(200);

        expect(response.body.data).toHaveProperty("token");

    }, 10000)


    it("Should fail with invalid credentials", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "wrong@test.com",
                password: '123456',
            });

        expect(response.status).toBe(401);

    }, 10000)
});

