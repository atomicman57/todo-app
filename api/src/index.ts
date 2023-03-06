import express from "express";
import cors from "cors";
import db from "./models";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", async (req, res) => {
  const tasks = await db.taskRepo.find();
  res.send({ tasks });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
