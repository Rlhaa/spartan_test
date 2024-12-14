import express from "express";
import {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/playerControllers.js";

const router = express.Router();

router.get("/getPlayers", getPlayers); // 플레이어 목록 조회
router.post("/addPlayer", addPlayer); // 플레이어 추가
router.put("/updatePlayer/:playerId", updatePlayer); // 플레이어 수정
router.delete("/deletePlayer/:playerId", deletePlayer); // 플레이어 삭제

export default router;