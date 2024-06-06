const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("API: accounts resource", () => {
  beforeAll(() => {
    return db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback(null, true))
      .then(() => db.migrate.latest());
  });

  beforeEach(() => {
    return db.seed.run();
  });

  afterAll(async () => {
    return await db.migrate.rollback(null, true).then(() => db.destroy());
  });

  describe("GET /accounts", () => {
    it("returns a list of accounts", async () => {
      const response = await request(app)
        .get("/accounts")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBeGreaterThan(0);

      const [account] = response.body.data;
      expect(account.id).toBeDefined();
      expect(account.name).toBeDefined();
      expect(account.username).toBeDefined();
    });
  });

  describe("GET /accounts/:accountId", () => {
    it("returns a specific account based on the given ID", async () => {
      const existing = await db("accounts").first();
      const response = await request(app)
        .get(`/accounts/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const account = response.body.data;
      expect(account.id).toBeDefined();
      expect(account.name).toBeDefined();
      expect(account.username).toBeDefined();
    });

    it("returns a 404 if the account cannot be found by an ID", async () => {
      const response = await request(app)
        .get(`/accounts/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /accounts", () => {
    it("allows for the creation of a new account", async () => {
      const response = await request(app)
        .post(`/accounts`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "Account Name",
            username: "account.name",
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const account = response.body.data;
      expect(account.id).toBeDefined();
      expect(account.name).toBeDefined();
      expect(account.username).toBeDefined();
    });

    it("returns an error if the `name` is missing", async () => {
      const response = await request(app)
        .post(`/accounts`)
        .set("Accept", "application/json")
        .send({
          data: {
            username: "account.name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
    it("returns an error if the `username` is missing", async () => {
      const response = await request(app)
        .post(`/accounts`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "Account Name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /accounts/:accountId", () => {
    it("allows for an account to be updated", async () => {
      const existing = await db("accounts").first();
      const response = await request(app)
        .put(`/accounts/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "New Account Name",
            username: "new.account.name",
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const account = response.body.data;
      expect(account.id).toEqual(existing.id);
      expect(account.name).toEqual("New Account Name");
      expect(account.username).toEqual("new.account.name");
    });

    it("returns a 404 if the account cannot be found by an ID", async () => {
      const response = await request(app)
        .put(`/accounts/invalid-id`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "New Account Name",
            username: "new.account.name",
          },
        });

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `name` is missing", async () => {
      const existing = await db("accounts").first();
      const response = await request(app)
        .put(`/accounts/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            username: "new.account.name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `username` is missing", async () => {
      const existing = await db("accounts").first();
      const response = await request(app)
        .put(`/accounts/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            name: "New Account Name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /accounts/:accountId", () => {
    it("deletes a specific account based on the given ID", async () => {
      const existing = await db("accounts").first();
      const response = await request(app)
        .del(`/accounts/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const account = response.body.data;
      expect(account.id).toBeDefined();
      expect(account.name).toBeDefined();
      expect(account.username).toBeDefined();

      const matching = await db("accounts").where({ id: existing.id }).first();
      expect(matching).not.toBeDefined();
    });

    it("returns a 404 if the account cannot be found by an ID", async () => {
      const response = await request(app)
        .del(`/accounts/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });
});
