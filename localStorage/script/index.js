
// Write all the JS Code related to Home Page Here 
let task_form=document.querySelector("form");
console.log(task_form);
 
LSData=JSON.parse(localStorage.getItem("tasks"))||[];

task_form.addEventListener("submit",function(event){
    event.preventDefault();
//    const {name,type,date,priority}=event.target;
    let obj={
        name:task_form.name.value,
        type:task_form.type.value,
        date:task_form.date.value,
        priority:task_form.priority.value,
    }
  LSData.push(obj);
  localStorage.setItem("tasks",JSON.stringify(LSData));
  displayTable(LSData);
});

LSdata = JSON.parse(localStorage.getItem("tasks"));
let tbody = document.querySelector("tbody");

 
displayTable(LSData);
function displayTable(data){
    tbody.innerHTML=null;
    data.forEach(function (element,index){
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=element.name
        let type=document.createElement("td");
        type.innerText=element.type
        let date=document.createElement("td");
        date.innerText=element.date
        let priority=document.createElement("td");
        priority.innerText=element.priority
        let complete=document.createElement("td");
        complete.innerText="complete";
        complete.addEventListener("click",function(){
            addData("task-completed",element);
            deleteData(LSData,index);
        })
 
        // Apply inline styles
        tr.style.backgroundColor = "lightgray";
        tr.style.color = "black";
        
        name.style.fontWeight = "bold";
        type.style.fontStyle = "italic";
        
        complete.style.cursor = "pointer";
        complete.style.color = "blue";
        
        tr.append(name, type, date, priority, complete);
        tbody.append(tr);
      });
      

}
function addData(key,value){
  let newLSData=JSON.parse(localStorage.getItem(key))||[];
  newLSData.push(value);
  localStorage.setItem(key,JSON.stringify(newLSData));
}
function deleteData(data,index){
    data.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(data));
    displayTable(data);
}
 



