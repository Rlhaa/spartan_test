// [함수 연습 문제]

// 문제 1: 두 숫자를 더하는 함수를 작성하고 결과를 출력하세요.
function test1(a,b) {
  return a + b;
}

// 문제 2: 이름을 매개변수로 받아서 "안녕하세요, [이름]님!"을 출력하는 함수를 작성하세요.
function test2(name) {
  console.log(`안녕하세요, ${name}님!`);
}

// 문제 3: 세 개의 숫자 중 가장 큰 수를 반환하는 함수를 작성하세요.
function test3(a, b, c) {
  let arr = [a,b,c]
  let maxvalue = Math.max(...arr)
  //Math.max는 배열을 직접 인자로 받울 수 없어 전개연산자를 통해 전달
  return maxvalue;
}

// 문제 4: 숫자를 매개변수로 받아 짝수인지 홀수인지 반환하는 함수를 작성하세요.
function test4(num) {
  if (num%2 === 0) {
    console.log("${num}은 짝수입니다.")
  } else {
    console.log("${num}은 홀수입니다.")
  }
}

function test4_1 (num) {
  return num%2 === 0 ? `${num}은 짝수입니다.` : `${num}은 홀수입니다.`
  //템플릿 리터럴 사용 시 백틱 사용
}


// 문제 5: 배열을 매개변수로 받아 모든 요소를 출력하는 함수를 작성하세요.

function test5(arr) {
  for (i=0; i<=arr.length; i++) {
    console.log(arr[i])
  }
}

   
  
