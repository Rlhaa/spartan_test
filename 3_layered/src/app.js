import express from "express";
import router from "./routes/index.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
