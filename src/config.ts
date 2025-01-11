import process from "node:process";

const config = {
  isProduction: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT) || 4000,
};

export default config;
