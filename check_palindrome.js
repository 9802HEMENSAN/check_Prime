// check Pal or Nor ?

let str="kanak";
let bag="";
for(let i=str.length-1;i>=0; i--){
  bag+=str[i];
}
if(bag==str){
  console.log("palindrone");
}else{
  console.log("Not palindrone");
}