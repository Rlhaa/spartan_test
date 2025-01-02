import { Router } from "express";
const router = Router();

// 좋아요 추가
router.post("/:postId/likes", (req, res) => {
  const { postId } = req.params;
});

// 좋아요 삭제
router.delete("/:postId/likes", (req, res) => {
  const { postId } = req.params;
});

export default router;
