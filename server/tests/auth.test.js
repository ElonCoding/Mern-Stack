import { app, request, initTestDB, closeTestDB } from "./setup.js";

beforeAll(async () => {
  await initTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

test("register then login", async () => {
  const reg = await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "test@example.com",
    password: "Password123"
  });
  expect(reg.status).toBe(201);
  expect(reg.body.token).toBeDefined();

  const login = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "Password123"
  });
  expect(login.status).toBe(200);
  expect(login.body.token).toBeDefined();
});
