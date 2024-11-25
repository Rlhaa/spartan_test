const objArray = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// myForEach 를 구현하여 arr.forEach 와 동일한 값이 나오도록 하기.
function myForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

/**
  { name: 'apple', price: 100 }
  { name: 'banana', price: 200 }
  { name: 'grape', price: 300 }
   */
objArray.forEach((obj) => {
  console.log(obj);
});

myForEach(objArray, function (obj) {
  console.log(obj);
});



// find를 이용하여 name 이 grape 인 객체를 찾기
let test = objArray.find((fruit) => {
  return fruit.name === 'grape';
})
console.log(test);


// findIndex를 이용하여 name 이 apple 인 객체의 index 찾기

let test1 = objArray.findIndex(
  (fruit) => {return fruit.name === 'apple';}
)
console.log(test1);