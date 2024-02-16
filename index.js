//створення сервера
import { BuildServer } from "./server.js";
BuildServer();

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
