// 필요한 모듈을 불러옵니다.
import readlineSync from "readline-sync";

// 프로그램 시작
function main() {
  // 사용자로부터 입력을 받습니다.
  const choice = readlineSync.question(
    "1. 사칙연산 계산기, 2. 구구단 출력기 (2~9단): "
  );
  // 입력에 따라 해당 기능을 실행합니다.
  console.log(`당신의 선택은: ${choice}`);
  switch (choice) {
    case "1":
      calculator();
      break;
    case "2":
      printMultiplicationTable();
      break;
    default:
      console.log("1, 2 중에 입력하세요!");
      main();
  }
}

// 사칙연산 계산기 함수

function calculator() {
  const num1 = parseFloat(
    readlineSync.question("\n첫 번째 숫자를 입력하세요. : ")
  );
  const opr = readlineSync.question("\n연산자를 입력하세요. [+, -, *, /] : ");
  const num2 = parseFloat(
    readlineSync.question("\n두 번째 숫자를 입력하세요. : ")
  );
  //parseFloat() >> readlineSync.question로 입력받은 값은 문자열 > 숫자로 변환해준다 > 실수이므로 소수점 반영 가능
  //parseInt() 도 같은 기능이지만 정수로만 변환된다.

  if (isNaN(num2)) {
    console.log("숫자를 입력하세요.");
  }

  if (!["+", "-", "*", "/"].includes(opr)) {
    console.log("예시에 포함된 연산자를 입력하세요.");
  }

  if (isNaN(num2)) {
    console.log("숫자를 입력하세요.");
  }

  let result;
  switch (opr) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }

  console.log(`\n계산결과 : ${result}`);

  // switch (opr) {
  //   case '/':
  //     return num1 / num2;
  //   case '-':
  //     return num1 - num2;
  //   case '+':
  //     return num1 + num2;
  //   case '*':
  //     return num1 * num2;
  //   default:
  //     return "정확히 입력하세요."
  // }
}

// 구구단 출력 함수
function printMultiplicationTable() {

  let frontNum = [];
  let backNum = [];

  for (let i = 2; i < 10; i++) {
    frontNum.push(i);
  }
  for (let j = 1; j < 10; j++) {
    backNum.push(j);
  }
  // console.log(frontNum);
  // console.log(backNum);


  for (let i=0; i<frontNum.length; i++){
    console.log(`\n=== ${frontNum[i]}단! === `)
    for (let j=0; j<=frontNum.length; j++){
      console.log(` ${frontNum[i]} X ${backNum[j]} = ${frontNum[i]*backNum[j]}`)
    }
  }
}

// 프로그램 실행
main();
