import { prisma } from "../src/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import { createUser } from "./factories/userFactory.js";

describe("POST /sign-up",  () => {

  beforeEach(async () => {
    await prisma.$executeRaw`TRUMCATE TABLE users`
  })

  afterAll(async () => {
    await prisma.$disconnect
  })

    it.todo("should return 201 and persist", async () => {

    const user = await createUser()

    const response = await supertest(app).post("/sign-up").send(user)

    const newUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    expect(response.status).toBe(201);
    expect(user).not.toBeNull();
    });
  
    it.todo("should return 422 a invalid body", async () => {
      const body = {};

      const response = await supertest(app).post("/sign-up").send(body)

      expect(response.status).toEqual(422)
    });

    it.todo("should return 409 given duplicate email", async () => {
      await supertest(app).post("/sign-up").send(createUser)
      const response = await supertest(app).post("/sign-up").send(createUser)
      const user = createUser()
      const body = await prisma.user.findMany({
        where:{
          email:(await user).email
        }
      })

      expect(response.status).toBe(409);
      expect(body.length).toEqual(1);
    });
  
   
  });

describe("POST /sign-in", () => {
it("returns true for valid params", () => {
    // Aqui vai o código desse teste
});

it("returns false for invalid params", () => {
    // Aqui vai o código desse teste
});


});