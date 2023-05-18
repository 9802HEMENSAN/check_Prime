// Write all the JS Code related to Favourites Page Here 
let favourite_tasks=JSON.parse(localStorage.getItem("task-favourites"));
console.log(favourite_tasks);
let tbody=document.querySelector("tbody");

displayTable(favourite_tasks);
function displayTable(data){
    data.forEach(function (element){
        let tr=document.createElement("tr");
        let name=document.createElement("td");
        name.innerText=element.name

        let type=document.createElement("td");
        type.innerText=element.type

        let date=document.createElement("td");
        date.innerText=element.date

        let priority=document.createElement("td");
        priority.innerText=element.priority

        tr.append(name,type,date,priority);
        tbody.append(tr);
    });
}
