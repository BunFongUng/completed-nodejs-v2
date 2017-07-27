const expect = require("expect");

const utils = require("./utils");

describe("Utils", () => {
  describe("#add & square", () => {
    it("should add two number", () => {
      let res = utils.add(12, 3);
      expect(res).toBe(15).toBeA("number");
    });

    it("should square x number", () => {
      let res = utils.square(3);
      expect(res).toBe(9).toBeA("number");
    });
  });

  describe("#async methods", () => {
    it("should async add two number", done => {
      utils.asyncAdd(5, 9, res => {
        expect(res).toBe(14).toBeA("number");
        done();
      });
    });
    it("should async square x number", done => {
      utils.asyncSquare(4, res => {
        expect(res).toBe(16).toBeA("number");
        done();
      });
    });
  });

  describe("#object", () => {
    it("should set fullname", () => {
      let person = {
        age: 25,
        location: "Phnom Penh"
      };

      let newPerson = utils.setName(person, "Lester Ly");

      expect(newPerson)
        .toInclude({
          first_name: "Lester"
        })
        .toExclude({
          sex: "male"
        });
    });
  });
});
