import { prisma } from "../database.js";

async function category() {
  return prisma.category.findMany();
}

async function teacher() {
  return prisma.teacher.findMany({select: {
    id: false,
    name: true,
    teacherDisciplines: true
  }});
}

async function discipline() {
  return prisma.discipline.findMany()
  
}

async function teacherDiscipline(teacherId: number, disciplineId: number) {
  const teacherDisciplineId = await prisma.teacherDiscipline.findFirst({
    where:{
        teacherId: teacherId,
        disciplineId: disciplineId
    },
    select: { id: true }
})
if (teacherDisciplineId) {return teacherDisciplineId.id} else{return null}
}

export default {
  category,
  teacherDiscipline,
  teacher,
  discipline
};
