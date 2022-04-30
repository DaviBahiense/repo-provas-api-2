import { prisma } from "../src/database.js";

async function main() {
    await prisma.teacher.createMany({
        data:[
            { name: "Pedrão" },
            { name: "Dina" }
        ]
    })
    await prisma.term.createMany({
        data:[
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 }
        ]
    })
    await prisma.discipline.createMany({
        data:[
            { name: "HTML", termId: 1 },
            { name: "CSS", termId: 2 },
            { name: "JS", termId: 3 },
            { name: "BACKEND", termId: 4 },
            { name: "SQL", termId: 5 },
            { name: "TEST", termId: 6 }
        ]
    })
    await prisma.category.createMany({
        data:[
            { name: "P1" },
            { name: "P2" },
            { name: "P3" }
        ]
    }),
    await prisma.teacherDiscipline.createMany({
        data:[
            { teacherId: 1, disciplineId: 1 },
            { teacherId: 1, disciplineId: 2 },
            { teacherId: 1, disciplineId: 3 },
            { teacherId: 2, disciplineId: 4 },
            { teacherId: 2, disciplineId: 5 },
            { teacherId: 2, disciplineId: 6 }
        ]
    })
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () =>{
        await prisma.$disconnect();
    }) 