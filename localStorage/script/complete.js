// Write all the JS Code related to Completed Page Here 
let completed_tasks=JSON.parse(localStorage.getItem("task-completed"));
console.log(completed_tasks);
let tbody=document.querySelector("tbody");

let filter=document.getElementById("filter");

displayTable(completed_tasks);
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

        let deleted=document.createElement("td");
        deleted.innerText="delete"
        
        deleted.addEventListener("click",function (){
            deleteData(data,index)
        })
        let favourite=document.createElement("td");
        favourite.innerText="favourite";
        
        favourite.addEventListener("click",function(){
            addData("task-favourites",element);
            deleteData(completed_tasks,index);
        })
        tr.append(name,type,date,priority,favourite,deleted);
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
      localStorage.setItem("task-completed",JSON.stringify(data));
      displayTable(data);
  }

  filter.addEventListener("change",function(){
    if(filter.value==""){
        displayTable(completed_tasks);
    }else{
        let filteredData=completed_tasks.filter(function(element){
            return element.priority==filter.value;
        })
        displayTable(filteredData);
    }
  });