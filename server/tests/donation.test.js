import { app, request, initTestDB, closeTestDB } from "./setup.js";

let adminToken;
let userToken;
let templeId;

beforeAll(async () => {
  await initTestDB();
  const adminReg = await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin2@example.com",
    password: "AdminPass123",
    role: "ADMIN"
  });
  adminToken = adminReg.body.token;
  const userReg = await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user2@example.com",
    password: "UserPass123"
  });
  userToken = userReg.body.token;
  const tRes = await request(app)
    .post("/api/temples")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "Temple B", location: "Town" });
  templeId = tRes.body._id;
});

afterAll(async () => {
  await closeTestDB();
});

test("user donates and admin lists all donations", async () => {
  const dRes = await request(app)
    .post("/api/donations")
    .set("Authorization", `Bearer ${userToken}`)
    .send({ templeId, amount: 500 });
  expect(dRes.status).toBe(201);
  const my = await request(app).get("/api/donations/me").set("Authorization", `Bearer ${userToken}`);
  expect(my.status).toBe(200);
  expect(my.body.length).toBe(1);
  const all = await request(app).get("/api/donations").set("Authorization", `Bearer ${adminToken}`);
  expect(all.status).toBe(200);
  expect(all.body.length).toBe(1);
});
