import { Router } from "express";
const router = Router();

router.post("/:postId", (req, res) => {});

router.get("/:postId/comments", (req, res) => {
  const { postId } = req.params;
});

router.patch("/:postId/comments", (req, res) => {
  const { postId } = req.params;
});

router.delete("/:postId/comments", (req, res) => {
  const { postId } = req.params;
});

export default router;
