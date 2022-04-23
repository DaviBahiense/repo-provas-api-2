import { prisma } from "../database.js";

export async function findTeacher(teacher) {
    const teacherId = await prisma.teachers.findFirst({
        where:{  name: teacher  },
        select: { id: true  }
    })
    if (teacherId) {return teacherId.id} else{return null}
    
}

export async function findTerm(term) {
    const termId = await prisma.terms.findFirst({
        where:{  number: term  },
        select: { id: true  }
    })
    if (termId) {return termId.id} else{return null}
}

export async function findDiscipline(discipline) {
    return await prisma.disciplines.findFirst({
        where:{  name: discipline   }
    })
    
}

export async function findTeacherDiscipline(teacherId:number, disciplineId:number) {
    const teacherDisciplineId = await prisma.teachersDisciplines.findFirst({
        where:{
            teacherId: teacherId,
            disciplineId: disciplineId
        },
        select: { id: true }
    })
    if (teacherDisciplineId) {return teacherDisciplineId.id} else{return null}
}

export async function createTerm(term) {
    const [newTerm] = await prisma.$transaction([  
        prisma.terms.create({
        data:{ number:term }
    })]);
    return newTerm.id
}

export async function createTeacher(teacher) {
    const [newTeacher] = await prisma.$transaction([  
        prisma.teachers.create({
        data:{ name:teacher }
    })]);
    return newTeacher.id
}

export async function createDiscipline(discipline, term) {
    const [newDiscipline] = await prisma.$transaction([  
        prisma.disciplines.create({
        data:{ 
            name:discipline,
            termId: term
        }
    })]);
    return newDiscipline.id
}

export async function createTeacherDiscipline(teacher, discipline) {
    const [newTeacherDiscipline] = await prisma.$transaction([ 
        prisma.teachersDisciplines.create({
        data: {
            teacherId: teacher,
            disciplineId: discipline
        }
    })]);
    return newTeacherDiscipline.id
}

export async function insertTeacherDiscipline(teacher, discipline) {
    
}