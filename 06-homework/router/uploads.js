import { Router } from "express";
const router = Router();

// 프로필 이미지 업로드
router.post("/users/:userId/profile-image", (req, res) => {
  const { userId } = req.params;
});

// 게시물 이미지 업로드
router.post("/posts/:postId/image", (req, res) => {
  const { postId } = req.params;
});

export default router;
