const objArray = [
  { name: 'apple', price: 100 },
  { name: 'banana', price: 200 },
  { name: 'grape', price: 300 },
]

// myFilter 를 구현하여 arr.filter 와 동일한 값이 나오도록 하기.
function myFilter(arr, callback) {
  // myFilter 구현
  let list = [];
  // myMap 구현
  for (let i = 0; i<arr.length; i++) {
    if(callback(arr[i])){
      list.push(arr[i]);
    }
  }
  return list;
}


const result1 = objArray.filter(function (a) {
  return a.price >= 200
});
// arr.price가 200 이상일 경우에만 >> 함수에서 거름
// 배열로 푸쉬하면 만들수있긴함

let result2 = myFilter(objArray, function (obj) {
  return obj.price >= 200
});

console.log(result1);
console.log(result2);
console.log(JSON.stringify(result1) === JSON.stringify(result2)); // true



// myMap를 구현하여 arr.map과 동일한 값이 나오도록 하기.
function myMap(arr, callback) {
  let list = [];
  // myMap 구현
  for (let i = 0; i<arr.length; i++) {
    list.push(callback(arr[i]));
  }
  return list;
}

const result3 = objArray.map(function (test) {
  return test.price
});

const result4 = myMap(objArray, function (obj) {
  return obj.price
});

console.log(result3)
console.log(result4)
console.log(JSON.stringify(result3) === JSON.stringify(result4));






// reduce를 이용하여 arr의 모든 값에 곱하기 2를 한 값의 총합을 구하기.
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce(function (prev, current) {
  return prev + current*2
}, 0)
console.log(sum)

