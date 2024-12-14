// controllers.js
import { PrismaClient } from "@prisma/client";

// Prisma와 같은 ORM(Object Relational Mapping) 라이브러리를 사용할 때
// db 작업이 Promise를 반환
// 따라서 해당 작업이 완료될 때까지 기다리기 위해 await를 사용
// prisma.player.create()는 Promise를 반환하므로, 이를 기다리기 위해 await 사용
const prisma = new PrismaClient();

// 플레이어 목록 조회
export const getPlayers = async (req, res) => {
  const Players = await prisma.player.findMany({
    select: {
      playerId: true,
      name: true,
      speed: true,
      shooting: true,
      grade: true,
    },
    orderBy: {
      grade: "desc",
    },
  });

  return res.status(200).json({ data: Players });
};

// 플레이어 추가
export const addPlayer = async (req, res) => {
  const { name, speed, shooting, grade } = req.body;
  const parsedSpeed = parseInt(speed, 10);
  const parsedShooting = parseInt(shooting, 10);
  // name 중복 체크
  const isExistName = await prisma.player.findFirst({
    where: { name },
  });

  if (isExistName) {
    return res.status(409).json({ message: "이미 존재하는 이름입니다." });
  }

  const newPlayer = await prisma.player.create({
    data: {
      // 뽑아온 nickname, account_id를 각 컬럼에 적용한다.
      name: name,
      speed: parsedSpeed,
      shooting: parsedShooting,
      grade: grade,
    },
  });
  return res
    .status(201)
    .json({ message: "플레이어 생성 성공", player: newPlayer });
};

// 플레이어 수정
export const updatePlayer = async (req, res) => {
  const { playerId } = req.params;

  const { name, speed, shooting, grade } = req.body;
  const parsedSpeed = parseInt(speed, 10);
  const parsedShooting = parseInt(shooting, 10);
  try {
    if (!name || !speed || !shooting || !grade) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const isExistPlayer = await prisma.player.findFirst({
      select: {
        playerId: true,
      },
      where: {
        playerId: +playerId,
      },
    });
    if (!isExistPlayer) {
      return res.status(404).json({ message: "존재하지 않는 선수입니다." });
    }

    const player = await prisma.player.update({
      data: {
        name,
        speed: parsedSpeed,
        shooting: parsedShooting,
        grade,
      },
      where: { playerId: +playerId },
    });

    return res
      .status(200)
      .json({ message: "선수 정보가 성공적으로 수정되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};

// 플레이어 삭제
export const deletePlayer = async (req, res) => {
  const playerId = parseInt(req.params.playerId, 10);
  try {
    const isExistPlayer = await prisma.player.findUnique({
      where: { playerId: playerId },
    });
    if (!isExistPlayer) {
      return res
        .status(404)
        .json({ errorMessage: "존재하지 않는 선수 데이터입니다." });
    }
    await prisma.player.delete({ where: { playerId: playerId } });

    return res.status(200).json({
      message: "선수 정보가 성공적으로 삭제되었습니다.",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};
