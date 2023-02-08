import { PrismaClient } from '@prisma/client';
import { employees } from './employees';

const prisma = new PrismaClient();

async function main() {
  for (let item of employees) {
    await prisma.employee.create({
      data: {
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        gender: item.gender,
        photo: item.photo,
        no_val: item.number,
      },
    });
  }

  // await prisma.employee.createMany({
  //   data: employees,
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// async function main() {
//   // 1. Parse the JSON file
//   const data = JSON.parse(fs.readFileSync('seeds/employees.json', 'utf-8'));

//   // 2. Insert the data into the table
//   for (let item of data) {
//     await prisma.employee.create({
//       data: {
//         first_name: item.first_name,
//         last_name: item.last_name,
//         email: item.email,
//         gender: item.gender,
//         photo: item.photo,
//         number: item.number,
//       },
//     });
//   }

//   // 3. Verify that the data was seeded correctly
//   const employees = await prisma.employee.findMany();
//   console.log(employees);

//   await prisma.$disconnect();
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
