import cors from "cors";
import express, { Response, Request } from "express";

const categoryRoute = require("./routes/category/index");
const authorRoute = require("./routes/author/index");

const config = require("../config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", categoryRoute);
app.use("/api", authorRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log(`server is up and running at ${config.PORT}`);
});
