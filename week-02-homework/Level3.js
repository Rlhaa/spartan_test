const objArray = [
  { name: 'apple', price: 100 },
  { name: 'banana', price: 200 },
  { name: 'grape', price: 300 },
]

// myFind 를 구현하여 arr.find 와 동일한 값이 나오도록 하기.
function myFind(arr, callback) {
  // myFind 구현
  // callback >> (obj) => {return obj.name === 'banana';}
  // 콜백에 arr[i]가 들어갔을 때, 
  // 콜백은 arr[i].name이 banana인지 확인한다.
  // 맞으면 true가 나오고, banana인지 체크하는 과정이기 때문에 true때 
  // arr[i]를 반환한다.
  for (let i = 0; i<arr.length; i++) {
    if (callback(arr[i]) === true){
      return arr[i];
    }
  }
}

const result1 = objArray.find(function (obj) {
  return obj.name === 'banana';
});

const result2 = myFind(objArray, function (obj) {
  return obj.name === 'banana';
});
console.log(result1);
console.log(result2);
console.log(result1 === result2); // true




// myFindIndex 를 구현하여 arr.findIndex 와 동일한 값이 나오도록 하기.
function myFindIndex(arr, callback) {
  // myFindIndex 구현
  for (let i = 0; i<arr.length; i++) {
    if (callback(arr[i])){
      return i;
    }
  }
}

const result3 = objArray.findIndex(function (obj) {
  return obj.name === 'banana';
});

const result4 = myFindIndex(objArray, function (obj) {
  return obj.name === 'banana';
});
console.log(result3);
console.log(result4);
console.log(result3 === result4); // true


// filter 를 이용하여 price가 200 이상인 객체 filter
const filtered = objArray.filter(function (a) {
    return a.price >= 200
});
console.log(filtered)

// map을 이용하여 price값만 모아둔 배열 만들기

const maped = objArray.map(function (a) {
  return a.price
});
console.log(maped)



