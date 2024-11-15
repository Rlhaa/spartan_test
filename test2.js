// [조건문 연습 문제]

// 문제 1: 숫자를 입력받아 짝수인지 홀수인지 출력하세요.
let n = 3
if (n%2 === 0) {
    console.log(`{n}은 짝수입니다.`)
} else {
    console.log(`{n}은 홀수입니다.`)
}
// 문제 2: 점수를 입력받아 학점을 출력하세요.
// 90점 이상 A, 80점 이상 B, 70점 이상 C, 그 외 D
let score = null;
if (score >= 90) { 
    console.log(`A학점입니다.`)
} else if (score >= 80) {
    console.log(`b학점입니다.`)
} else if (score >= 70) {
    console.log(`c학점입니다.`)
} else {
    console.log(`d학점입니다.`)
}

// 문제 3: 나이를 입력받아 성인인지 미성년자인지 출력하세요.
let age = null;
if (age >= 20) {
    console.log(`성인입니다.`)
} else {
    console.log(`미성년자입니다.`)
}


// 문제 4: switch문을 사용하여 요일을 출력하세요.
const day = null;
switch (day) {
      case '월':
        console.log('월요일입니다.');
        break;
      case '화':
        console.log('화요일입니다.');
        break;
      case '수':
        console.log('수요일입니다.');
        break;
      case '목':
        console.log('목요일입니다.');
        break;
      case '금':
        console.log('금요일입니다.');
        break;
      case '토':
        console.log('토요일입니다.');
        break;
      case '일':
        console.log('일요일입니다.');
        break;
}

// 문제 5: 두 숫자를 비교하여 큰 수를 출력하세요.
let a = null;
let b = null;
if (a>b) {
    console.log(a);
} else if (a<b) {
    console.log(b);
}

