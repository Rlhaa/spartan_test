// 필요한 모듈을 불러옵니다.
import readlineSync from 'readline-sync';

// 프로그램 시작
function main() {
  // 사용자로부터 입력을 받습니다.
  const choice = readlineSync.question(
    '1. 사칙연산 계산기, 2. 구구단 출력기 (2~9단): ',
  );
  // 입력에 따라 해당 기능을 실행합니다.
  console.log(`당신의 선택은: ${choice}`)
  sw
}

// 사칙연산 계산기 함수
function calculator() {
  // 여기에 코드를 작성하세요.
}

// 구구단 출력 함수
function printMultiplicationTable() {
  // 여기에 코드를 작성하세요.
}

// 프로그램 실행
main();