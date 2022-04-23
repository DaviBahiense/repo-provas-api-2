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

}

export async function create(name, url, category) {
    
}
