import { BuildServer } from "@/server";
BuildServer();
// import { UserController } from "@/user/user.controller";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// UserController.create({ username: "alina", password: "656565" })
//   .catch(e => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
//   findUnique: async () => {
//     const res = await prisma.user.findUnique({ where: { id: 1 } });
//     return res;
//   },
// };

// userController
//   .findUnique()
//   .then(result => {
//     console.log(result); // Виводимо результат у консоль
//   })
//   .catch(error => {
//     console.error("помилка prisma", error); // Виводимо помилку у консоль, якщо вона є
//   });

//запит до бази даних НЕ ВИДАЛЯТИ
// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
//   host: "database_crm",
//   port: 5432,
//   user: "admin",
//   password: "admin",
//   database: "crm",
// });

// // client.connect();
// // SQL-запит для створення таблиці
// const createTableQuery = `
// CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(20) NOT NULL,
//     password VARCHAR(20) NOT NULL
// )
// `;
// client
//   .connect()
//   .then(() => client.query(createTableQuery))
//   .then(() => console.log("Таблицю users успішно створено"))
//   .catch(error => console.error("Помилка при створенні таблиці:", error))
//   .finally(() => client.end());
