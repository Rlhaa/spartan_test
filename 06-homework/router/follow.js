import { Router } from "express";
const router = Router();

// 팔로우
router.post("/:userId/follow", (req, res) => {});

// 언팔로우
router.delete("/:userId/follow", (req, res) => {});

export default router;
