// Check Prime or Not ?
let num=23;
let factor=1;
for(let i=0; i<num; i--){
  if(num%i==0){
    factor++;
  }
  if(factor==5){
    console.log(Prime);
  }else{
    console.log(not a prime);
  }
}