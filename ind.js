// const single = async () => {
//   const demo1 = () => {
//     return new Promise((resolve, reject) => {
//       const arr = [];
//       for (let i = 0; i <= 10000000; i++) {
//         arr.push(i);
//         // console.log(arr);
//       }
//       if (arr.length) {
//         resolve(arr);
//       } else {
//         reject("failed");
//       }
//     });
//   };
//   try {
//     const demo2 = () => {
//       console.log("hello111111");
//     };

//     const demo3 = () => {
//       console.log("hello333333333");
//     };

//     demo1().then((response) => {
//       console.log(response);
//     });

//     demo3();
//     demo2();
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// single();

// let rey = 1234;
// const test= rey.toString().split("").reverse().join('')
// console.log(test);
// let rey = [1,2,3,4];
// const test= rey.reverse()
// console.log(test);
// let rey = [1,2,3,4];
// let arr = []
// let test = rey.map((item,i)=>{
//   console.log((rey.length)-i)
// arr.push(rey[(rey.length-1)-i])
// })
// console.log(arr);

// let rey = [1,2,3,4];
// let arr = []
// let test = rey.forEach((item,i)=>{
//   console.log(item);
// //   console.log((rey.length)-i)
// //  arr.push(rey[(rey.length-1)-i])
// })

//  console.log(arr);

// Declare a variable using var
// var myVariable = 42;

// // Access the variable through the global object
// console.log(Window.myVariable); // Output: 42

// function func2() {
//   for (var i = 0; i <= 3; i++) {
//     // setTimeout(() => console.log(i), 2000);
//      console.log(i)
//   }
// }
// func2();


// let x = {}; let y;
// //  y = {name:"Ronny"},z = {name:"John"};
// x[y] = {name:"Vivek"};
// console.log(x)
// x[z] = {name:"Akki"};
// console.log(x[y]);

// var myObject = { name: 'John', age: 25, city: 'New York' };
// console.log(myObject['age']); // Output: 25

// for(var i=0;i<=2;i++){

//   setTimeout(()=>console.log(i),1000)
   
// }