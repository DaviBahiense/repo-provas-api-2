import { Tests } from "@prisma/client";
import * as testsRepository from "../repositories/testsRepository.js"

export type Test = Omit<Tests, "id">;

export async function teacherDiscipline(teacher, discipline, term) {

    const foundIdTeacher = await testsRepository.findTeacher(teacher);
    let newTeacherId : number;
    if (!foundIdTeacher){  newTeacherId = await testsRepository.createTeacher(teacher) };

    const foundIdTerm = await testsRepository.findTerm(term);
    let newTermId : number;
    if (!foundIdTerm){  newTermId = await testsRepository.createTerm(term) };

    const foundDiscipline = await testsRepository.findDiscipline(discipline);
    let foundIdDiscipline: number ;
    if (foundDiscipline) {
        foundIdDiscipline = foundDiscipline.id
        if(foundDiscipline.termId !== foundIdTerm) throw {type: "conflict", message: "Disciplina já possui período cadastrado"}
    }
    let newDisciplineId : number;
    if (!foundDiscipline){  
        newDisciplineId = await testsRepository.createDiscipline(discipline, foundIdTerm || newTermId) 
    };
   
    const foundTeacherDiscipline = await testsRepository.findTeacherDiscipline(foundIdTeacher || newTeacherId, foundIdDiscipline || newDisciplineId);
    let newTeacherDisciplineId : number
    if (!foundTeacherDiscipline) { newTeacherDisciplineId = await testsRepository.createTeacherDiscipline(foundIdTeacher || newTeacherId, foundIdDiscipline || newDisciplineId) }; 

    return foundTeacherDiscipline || newTeacherDisciplineId
}

export async function category(category) {
    const foundCategoryId = await testsRepository.findCategory(category)
    let newCategoryId
    if (!foundCategoryId) { newCategoryId = await testsRepository.newCategory(category)}

    return foundCategoryId || newCategoryId
}

export async function createTest(name, url, categoryId, teacherDisciplineId) {

    const newTest = await testsRepository.findTest(name, url, categoryId, teacherDisciplineId)
    if (newTest) throw {type: "conflict", message: "Prova já cadastrada"}

    await testsRepository.createTest(name, url, categoryId, teacherDisciplineId)
}
