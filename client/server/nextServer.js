//npm run client for only client
//npm run server for only server
//npm run dev for both
//npm run build for building
//npm run start for build start of frontend
//npm run prod for production (env NODE_ENV=production)
//npm run prod for production (env NODE_ENV=development)

import dotenv from "dotenv";
import next from "next";
dotenv.config();
import app from "./app.js";
import express from "express";

// Starting the server based on production  or development environment
// if production environment the take from build other wise take from dev
const command =
  process.env.NODE_ENV === "production" ? { start: true } : { dev: true };
const nextApp = next(command);

nextApp.prepare().then(() => {
  const server = express();

  // Use the common Express configuration
  server.use(app); // Importing routes, middleware, etc.

  // Let Next.js handle frontend requests
  server.all("*", (req, res) => {
    return nextApp.getRequestHandler()(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
