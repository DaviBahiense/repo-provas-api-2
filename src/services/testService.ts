import testRepository from "../repositories/testRepository.js";
import { Test } from "@prisma/client"

interface Filter {
  groupBy: "disciplines" | "teachers";
}
export type CreateTest = Omit<Test, "id">;


async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function create(testData:CreateTest) {

  await testRepository.create(testData) 
  
}

export default {
  find,
  create,
};
