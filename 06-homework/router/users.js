import { Router } from "express";
const router = Router();

// 프로필 조회
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
});

// 프로필 수정
router.patch("/:userId", (req, res) => {
  const { userId } = req.params;
});

// 탈퇴
router.post("/:userId", (req, res) => {
  const { userId } = req.params;
});

export default router;
