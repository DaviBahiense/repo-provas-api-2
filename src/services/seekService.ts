import seekRepository from "../repositories/seekRepository.js";

async function category() {
  return seekRepository.category();
}

async function teacher() {
  return seekRepository.teacher();
}

async function discipline() {
  return seekRepository.discipline();
}

async function teacherDiscipline(teacherId: number, disciplineId: number) {
  return await seekRepository.teacherDiscipline(teacherId, disciplineId);
}

export default {
  category,
  teacherDiscipline,
  teacher,
  discipline
};
