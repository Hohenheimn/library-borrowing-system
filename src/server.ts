import express, { Response, Request } from "express";


const config = require("../config");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log(`server is up and running at ${config.PORT}`);
});
