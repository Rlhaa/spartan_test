import { Router } from "express";
const router = Router();

// 게시물 작성
router.post("/", (req, res) => {});

// 게시물 전체 조회
router.get("/", (req, res) => {});

// 게시물 상세 조회
router.get("/:postId", (req, res) => {});

// 게시물 수정
router.patch("/:postId", (req, res) => {});

// 게시물 삭제
router.delete("/:postId", (req, res) => {});

export default router;
