import express from "express";
import routes from "./routes/routes.js";

const app = express();

app.use(express.json()); // JSON 요청을 처리하기 위한 미들웨어

app.use("/api", routes); // 라우트 설정

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
