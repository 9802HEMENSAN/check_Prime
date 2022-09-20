 // Problem 1: Create a function to check if a number is Prime or Not
function checkPrime(num){
  let factor=0;
 for(let i=1; i<=num; i++){
  if(num%i===0){
     factor++;
   }
 }
 if(factor==2){
   console.log(num,"is prime");
 }else{
   console.log(num,"is not a prime");
 }
 }
  
 checkPrime(13);
