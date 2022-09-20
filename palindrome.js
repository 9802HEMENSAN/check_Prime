  // Check Prime or Not ?
  function reverse(str){
    let bag="";
    for(let i=str.length-1;i>=0; i--){
      bag+=str[i];
    }
     if(bag==str){
       return true;
     }
   return false;
  }
    
  let ans=reverse("kanak");
  if(ans==true){
    console.log("palindrome");
  }else{
    console.log("Not a Palindome");
  }
 

 
 
 
 
 