import { prisma } from "../database.js";
import { CreateTest } from "../services/testService.js" 

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
} 

async function create(testData:CreateTest) {
  return prisma.test.create({
    data:{
      name: testData.name,
      pdfUrl: testData.pdfUrl,
      categoryId: testData.categoryId,
      teacherDisciplineId: testData.teacherDisciplineId 
    }  
  })
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  create
};
