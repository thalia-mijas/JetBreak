const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/db");
const User = require("../models/user.model");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Endpoints de autenticación", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "newuser",
      password: "newpassword",
    };
    const res = await request(app).post("/api/register").send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully", newUser);
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "newuser", password: "newpassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
