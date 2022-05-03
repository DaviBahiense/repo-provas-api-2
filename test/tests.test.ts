import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory";
import userFactory from "./factories/userFactory";

describe("User tests - POST /sign-up", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 201 and persist the user given a valid body", async () => {
    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email, 
      }, 
    });

    expect(response.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("should return 422 given a invalid body", async () => {
    const body = {};

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toEqual(422);
  });

  it("should return 409 given a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/sign-up").send(body);
    const response = await supertest(app).post("/sign-up").send(body);
    const users = await prisma.user.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(409);
    expect(users.length).toEqual(1);
  });
});   

describe("User tests - POST /sign-in", () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it("should return 200 and a token given valid credentials", async () => {
    const body = userBodyFactory();
    await userFactory(body);

    const response = await supertest(app).post("/sign-in").send(body);
 
    expect(response.status).toEqual(200);
    expect(typeof response.body.token).toEqual("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it("should return 401 given invalid email", async () => {
    const body = userBodyFactory();

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(401);
  });

  it("should return 401 given invalid password", async () => {
    const body = userBodyFactory();
    await userFactory(body); 

    const response = await supertest(app)
      .post("/sign-in")
      .send({
        ...body,
        password: "alo",
      });

    expect(response.status).toEqual(401);
  });
});

describe("GET tests /tests", () => {
  beforeEach(truncateUsers)

  afterAll(disconnect)

  it("should return 401 whith a invalid credentials", async () => {
    
    const data = {};

    const response = await supertest(app)
      .get("/tests")
      .send(data)
      .set("Authorization", "123.123.123");

    expect(response.status).toEqual(401);
  })

  it("should return object with a valid token", async () => {

    const data = {}

    const body = userBodyFactory();
    await userFactory(body); 
    const siginIn = await supertest(app).post("/sign-in").send(body);
  
    const response = await supertest(app)
    .get("/tests?groupBy=teachers" || "/tests?groupBy=disciplines" )
    .send(data)
    .set("Authorization", siginIn.body.token);

    expect(response.status).toEqual(200);

    expect(typeof siginIn.body.token).toEqual("string");
    expect(siginIn.body.token.length).toBeGreaterThan(0); 
  })
})

describe("POST tests / tests", () => {
  beforeEach(truncateUsers)
  beforeEach(truncateTests)

  afterAll(disconnect)

  it("should return 201 when create a new test", async () =>{

    const body = {name: "prova", pdfUrl: "www.google.com", categoryId: 1, teacherDisciplineId: 1}

    const user = userBodyFactory();
    await userFactory(user); 
    const siginIn = await supertest(app).post("/sign-in").send(user);

    const response = await supertest(app).post("/tests").send(body)

    expect(response.status).toEqual(201);

  })
})

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
}