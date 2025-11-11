import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config(); // This loads environment variables from your .env file

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});
