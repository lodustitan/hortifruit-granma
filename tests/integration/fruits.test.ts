import supertest from "supertest";
import fruitsRepository from "repositories/fruits-repository";
import app from "index";

const server = supertest(app)

beforeAll(() => {
  fruitsRepository.insertFruit({name: "Banana", price: 4000});
  fruitsRepository.insertFruit({name: "Tomate", price: 6000});
  fruitsRepository.insertFruit({name: "Pera", price: 5000});
  fruitsRepository.insertFruit({name: "Uva", price: 8000});   
})

describe("GET /fruits", () => {
  it("Should return status code 200 if successful", async () => {
    const result = await server.get("/fruits");
    const { status } = result;

    expect(status).toBe(200);
  });
});

describe("GET /fruits/:id", () => {
  it("Should return status code 200 if param id is correctly", async () => {
    const result = await server.get("/fruits/1");
    const { status } = result;

    expect(status).toBe(200);
  });

  it("Should return status code 404 if param id is wrong", async () => {
    const result = await server.get("/fruits/abc");
    const { status } = result;

    expect(status).toBe(404);
  });
});