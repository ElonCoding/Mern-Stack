import { app, request, initTestDB, closeTestDB } from "./setup.js";

let adminToken;
let userToken;
let templeId;
let slotId;

beforeAll(async () => {
  await initTestDB();
  const adminReg = await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@example.com",
    password: "AdminPass123",
    role: "ADMIN"
  });
  adminToken = adminReg.body.token;
  const userReg = await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@example.com",
    password: "UserPass123"
  });
  userToken = userReg.body.token;
});

afterAll(async () => {
  await closeTestDB();
});

test("admin creates temple and slot, user books and cancels", async () => {
  const tRes = await request(app)
    .post("/api/temples")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "Temple A", location: "City", description: "Desc", deity: "Deity" });
  expect(tRes.status).toBe(201);
  templeId = tRes.body._id;

  const sRes = await request(app)
    .post("/api/slots")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ temple: templeId, date: "2026-03-10", startTime: "09:00", endTime: "10:00", capacity: 2 });
  expect(sRes.status).toBe(201);
  slotId = sRes.body._id;
  expect(sRes.body.availableSeats).toBe(2);

  const bRes = await request(app)
    .post("/api/bookings")
    .set("Authorization", `Bearer ${userToken}`)
    .send({ templeId, slotId });
  expect(bRes.status).toBe(201);
  const bookingId = bRes.body._id;

  const slotsList = await request(app).get(`/api/slots/temple/${templeId}`);
  expect(slotsList.body[0].availableSeats).toBe(1);

  const cancelRes = await request(app)
    .delete(`/api/bookings/${bookingId}`)
    .set("Authorization", `Bearer ${userToken}`);
  expect(cancelRes.status).toBe(200);
  expect(cancelRes.body.status).toBe("CANCELLED");

  const slotsList2 = await request(app).get(`/api/slots/temple/${templeId}`);
  expect(slotsList2.body[0].availableSeats).toBe(2);
});
