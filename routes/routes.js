import { users } from "../data.js";

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

      res.code(201).send({ message: "Item created successfully" });
    } catch (error) {
      res.code(500).send({ error: "Internal Server Error" });
    }
  });

  done();
}

export { usersRoutes };
