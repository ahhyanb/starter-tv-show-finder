const request = require("supertest");

const app = require("../src/app");
const db = require("../src/db/connection");

describe("API: lists resource", () => {
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

  describe("GET /lists", () => {
    it("returns a list of lists", async () => {
      const response = await request(app)
        .get("/lists")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBeGreaterThan(0);

      const [list] = response.body.data;
      expect(list.id).toBeDefined();
      expect(list.title).toBeDefined();
      expect(list.shows.length).toBeGreaterThan(0);
      expect(list.account_id).toBeDefined();
    });
  });

  describe("GET /lists/:listId", () => {
    it("returns a specific list based on the given ID", async () => {
      const existing = await db("lists").first();
      const response = await request(app)
        .get(`/lists/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const list = response.body.data;
      expect(list.id).toBeDefined();
      expect(list.title).toBeDefined();
      expect(list.shows.length).toBeGreaterThan(0);
      expect(list.account_id).toBeDefined();
    });

    it("returns a 404 if the list cannot be found by an ID", async () => {
      const response = await request(app)
        .get(`/lists/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /lists", () => {
    it("allows for the creation of a new list", async () => {
      const response = await request(app)
        .post(`/lists`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "List Name",
            account_id: 1,
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const list = response.body.data;
      expect(list.id).toBeDefined();
      expect(list.title).toBeDefined();
      expect(list.account_id).toBeDefined();
    });

    it("returns an error if the `title` is missing", async () => {
      const response = await request(app)
        .post(`/lists`)
        .set("Accept", "application/json")
        .send({
          data: {
            account_id: 1,
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `account_id` is missing", async () => {
      const response = await request(app)
        .post(`/lists`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "List Name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /lists/:listId", () => {
    it("allows for an list to be updated", async () => {
      const existing = await db("lists").first();
      const response = await request(app)
        .put(`/lists/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "New List Name",
            account_id: 2,
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toBeDefined();

      const list = response.body.data;
      expect(list.id).toEqual(existing.id);
      expect(list.title).toEqual("New List Name");
      expect(list.shows.length).toBeGreaterThan(0);
      expect(list.account_id).toEqual(2);
    });

    it("returns a 404 if the list cannot be found by an ID", async () => {
      const response = await request(app)
        .put(`/lists/invalid-id`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "List Name",
            account_id: 1,
          },
        });

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `title` is missing", async () => {
      const existing = await db("lists").first();
      const response = await request(app)
        .put(`/lists/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            account_id: 1,
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it("returns an error if the `account_id` is missing", async () => {
      const existing = await db("lists").first();
      const response = await request(app)
        .put(`/lists/${existing.id}`)
        .set("Accept", "application/json")
        .send({
          data: {
            title: "List Name",
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /lists/:listId", () => {
    it("deletes a specific list based on the given ID", async () => {
      const existing = await db("lists").first();
      const response = await request(app)
        .del(`/lists/${existing.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();

      const list = response.body.data;
      expect(list.id).toBeDefined();
      expect(list.title).toBeDefined();
      expect(list.account_id).toBeDefined();

      const matching = await db("lists").where({ id: existing.id }).first();
      expect(matching).not.toBeDefined();
    });

    it("returns a 404 if the list cannot be found by an ID", async () => {
      const response = await request(app)
        .del(`/lists/invalid-id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.data).not.toBeDefined();
      expect(response.body.error).toBeDefined();
    });
  });
});
