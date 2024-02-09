import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { usersRoutes } from "./routes/routes.js";

const PORT = 3500;
const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: "http://localhost:3002",
  //   credentials: true,
});
app.register(usersRoutes);

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
