const request = require("supertest");
const expect = require("expect");
var app = require("./server").app;

describe("Server", () => {
  describe("GET /", () => {
    it("should return json as response", done => {
      request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({
            status: "success"
          });
        })
        .end(done);
    });
  });

  describe("GET /users", () => {
    it("should return array of user data response", done => {
      request(app)
        .get("/users")
        .expect(200)
        .expect(res => {
          expect(res.body).toInclude({
            name: "Lester",
            age: 25
          });
        })
        .end(done);
    });
  });
});
