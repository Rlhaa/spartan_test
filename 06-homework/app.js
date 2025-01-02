import express from "express";
import authRoute from "./router/auth.js";
import userRoute from "./router/users.js";
import postRoute from "./router/posts.js";
import commentRoute from "./router/comments.js";
import likeRoute from "./router/likes.js";
import uploadRoute from "./router/uploads.js";

const app = express();

app.use(express.json());

// 라우터 연결
app.use("/api", [
  authRoute,
  userRoute,
  postRoute,
  commentRoute,
  likeRoute,
  uploadRoute,
]);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 열렸습니다.`);
});
