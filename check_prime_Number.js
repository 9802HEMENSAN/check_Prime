// Check Prime or Not ?
let num=20;
let factor=0;
for(let i=1; i<=num; i++){
  if(num%i==0){
    factor++;
  }
}
  if(factor==2){
    console.log("Prime");
  }else{
    console.log("not prime");
  }
