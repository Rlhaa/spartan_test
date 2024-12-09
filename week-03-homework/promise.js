const findTreasure = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.9;
    if (success) {
      resolve(" 축하합니다! 황금보물을 발견했습니다!");
    } else {
      reject("보물을 찾는데 실패했습니다. 다시 시도하세요.");
    }
  }, 3000); 
});

// 보물 상자 열기 실행

findTreasure // 호출
  .then((message) => {
    console.log(message); // 성공시 then 블록 실행
  })
  .catch((error) => {
    console.log(error); // 실패시 catch 블록 실행
  });



const treasure = async () => {
  try {
    // await를 사용하여 findTreasure의 결과를 기다린다
    // 성공 시 success 변수에 결과를 저장
    const success = await findTreasure;
    console.log(success);
  } catch (fail) {
    console.log(fail);
  }
};
treasure();
