import express from "express";
import cors from "cors";
import taskRouter from './routes/tasks.js'
import userRouter from './routes/users.js'
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRouter)
app.use("/users", userRouter)

const requestLogger = (req, res, next) => {
  const date = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${date}] : ${method} ${url}`);
  next();
  };

app.use(requestLogger);
app.get("/", (req, res) => {
  res.send("TaskManagerBackend");
});

app.listen(PORT, () => {
  console.log(`Poslužitelj sluša na portu ${PORT}`);
});

