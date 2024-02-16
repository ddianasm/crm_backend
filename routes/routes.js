import { users } from "../data.js";
const addUserToDB = userData => {
  const query = `INSERT INTO users (username, password) VALUES ( '${userData.username}', '${userData.password}')`;
  client
    .connect()
    .then(() => client.query(query))
    .then(() => console.log("Користувача успішно додано до bd"))
    .catch(error =>
      console.error("Помилка при додаванні дористувача до bd:", error)
    )
    .finally(() => client.end());
};

function usersRoutes(fastify, options, done) {
  fastify.get("/users", (req, reply) => {
    reply.send(users);
  });

  fastify.get("/users/:id", (req, reply) => {
    const { id } = req.params;
    const item = users.find(item => item.id === id);
    reply.send(item);
  });

  fastify.post("/users", (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      addUserToDB(data);

      res.code(201).send({ message: "Item created successfully" });
    } catch (error) {
      res.code(500).send({ error: "Internal Server Error" });
    }
  });

  done();
}

export { usersRoutes };

import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: "database_crm",
  port: 5432,
  user: "admin",
  password: "admin",
  database: "crm",
});

// client.connect();
// SQL-запит для створення таблиці
// const createTableQuery = `
//   INSERT INTO users (username, password) VALUES ( 'pig', '11111')
// `;
// client
//   .connect()
//   .then(() => client.query(createTableQuery))
//   .then(() => console.log("Користувача успішно додано до bd"))
//   .catch(error => console.error("Помилка при додаванні дористувача до bd:", error))
//   .finally(() => client.end());
