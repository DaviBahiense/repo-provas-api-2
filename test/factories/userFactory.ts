import { faker } from '@faker-js/faker';
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";


export async function createUser () {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  
    const insertedUser = await prisma.user.create({
          data: {
              email: user.email,
              password: user.password
          }
      });
  
    return insertedUser;
  } 