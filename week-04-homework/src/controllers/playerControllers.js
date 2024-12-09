// controllers.js
let players = [
  { id: 0, name: "차범근", speed: 100, shouting: 100, grade: "s" },
  { id: 1, name: "메시", speed: 100, shouting: 100, grade: "s" },
  { id: 2, name: "호날두", speed: 100, shouting: 100, grade: "s" },
  { id: 3, name: "네이마르", speed: 95, shouting: 90, grade: "a" },
  { id: 4, name: "펠레", speed: 98, shouting: 95, grade: "s" },
  { id: 5, name: "마라도나", speed: 97, shouting: 92, grade: "s" },
  { id: 6, name: "지단", speed: 94, shouting: 88, grade: "a" },
  { id: 7, name: "루니", speed: 93, shouting: 89, grade: "a" },
  { id: 8, name: "반 페르시", speed: 92, shouting: 87, grade: "a" },
  { id: 9, name: "토레스", speed: 91, shouting: 85, grade: "b" },
  { id: 10, name: "아자르", speed: 90, shouting: 84, grade: "b" },
  { id: 11, name: "손흥민", speed: 96, shouting: 91, grade: "a" },
  { id: 12, name: "바르셀로나", speed: 89, shouting: 83, grade: "b" },
  { id: 13, name: "이니에스타", speed: 88, shouting: 82, grade: "b" },
  { id: 14, name: "부폰", speed: 85, shouting: 80, grade: "a" },
  { id: 15, name: "카시야스", speed: 84, shouting: 79, grade: "a" },
  { id: 16, name: "마르셀로", speed: 87, shouting: 81, grade: "b" },
  { id: 17, name: "피르미누", speed: 86, shouting: 78, grade: "b" },
  { id: 18, name: "그리즈만", speed: 88, shouting: 80, grade: "a" },
  { id: 19, name: "홀란드", speed: 99, shouting: 96, grade: "s" },
];

// 플레이어 목록 조회
export const getPlayers = (req, res) => {
  res.json(players);
};

// 플레이어 추가
export const addPlayer = (req, res) => {
  const newPlayer = req.body;
  try {
    const newId = players[players.length - 1].id + 1;
    newPlayer.id = newId;

    players.push(newPlayer);
    return res
      .status(200)
      .json({ message: "선수 정보가 성공적으로 추가되었습니다." });
  } catch (error) {
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};

// 플레이어 수정
export const updatePlayers = (req, res) => {
  const { id } = req.params;

  const { name, speed, shouting, grade } = req.body;
  try {
    if (!name || !speed || !shouting || !grade) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const playerId = players.findIndex((player) => player.id === parseInt(id));
    // findIndex는 만족 요소가 없으면 -1을 반환한다
    if (playerId === -1) {
      return res.status(409).json({ message: "존재하지 않는 선수 id입니다." });
    }
    players[playerId].name = name;
    players[playerId].speed = speed;
    players[playerId].shouting = shouting;
    players[playerId].grade = grade;

    return res
      .status(200)
      .json({ message: "선수 정보가 성공적으로 수정되었습니다." });
  } catch (err) {
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};

// 플레이어 삭제
export const deletePlayers = (req, res) => {
  const { id } = req.params;

  try {
    const playerIndex = players.findIndex(
      (player) => player.id === parseInt(id)
    );
    // findIndex는 만족 요소가 없으면 -1을 반환한다
    if (playerIndex === -1) {
      return res.status(409).json({ message: "존재하지 않는 선수 id입니다." });
    }

    players.splice(playerIndex, 1);

    return res.status(200).json({
      message: "선수 정보가 성공적으로 삭제되었습니다.",
    });
  } catch (err) {
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};
