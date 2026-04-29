import express from "express";
import { connection } from "./src/db.js";
import cors from "cors";
import { router } from "./src/routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(router);

connection();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
