let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let checked = 0;
let unchecked = 0;
let total = 0;

let currentSpan = null;

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateCounters(){
    document.getElementById("checked").textContent = checked;
    document.getElementById("unchecked").textContent = unchecked;
    document.getElementById("total").textContent = total;
}
function updateNumbers(){

    let numbers = document.querySelectorAll(".order");

    numbers.forEach((item,index)=>{
        item.textContent = (index + 1) + ". ";
    });

}

function add(load=false, savedChecked=false){

    let task = document.getElementById("tasks").value.trim();
    let date=document.getElementById("duedate").value;
    

    if(task !== ""){


        let num=document.createElement("span");
        num.className="order";
        num.textContent=total+1+". ";


        let li=document.createElement("li");
        li.className="task-item";


        let span=document.createElement("span");
        span.className="task-text";
        span.textContent=task;


        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.className="task-check";
        checkbox.checked=savedChecked;


        let delbutton=document.createElement("button");
        delbutton.textContent="delete";
        delbutton.className="delete-btn";


        let edit=document.createElement("button");
        edit.textContent="edit";
        edit.className="edit-btn";

        let duedate=document.createElement("span");
        duedate.textContent=date
        duedate.className="duedate_in_li"



        li.appendChild(num);
        li.appendChild(span);
        li.appendChild(duedate);
        li.appendChild(checkbox);
        li.appendChild(delbutton);
        li.appendChild(edit);


        document.getElementById("tasklist").appendChild(li);



        total++;
        checkEmpty()


        if(checkbox.checked){

            checked++;

            span.style.textDecoration="line-through";
            span.style.color="green";
            li.style.boxShadow="2px 3px 10px green";

        }
        else{

            unchecked++;

        }


        if(!load){

            tasks.push({
                text:task,
                checked:false,
                duedate:date
            });

            saveTasks();

        }


        checkbox.addEventListener("change",function(){


            let taskObject = tasks.find(t=>t.text===span.textContent);
            



            if(this.checked){

                span.style.textDecoration="line-through";
                
                li.style.boxShadow="2px 3px 10px green";


                checked++;
                unchecked--;


                if(taskObject){
                    taskObject.checked=true;
                }


            }

            else{

                span.style.textDecoration="none";
                
                li.style.boxShadow="2px 3px 10px black";


                checked--;
                unchecked++;


                if(taskObject){
                    taskObject.checked=false;
                }

            }


            saveTasks();
            updateCounters();


        });


        delbutton.onclick=function(){
            if(confirm("are you sure you want to delete?")){
            tasks = tasks.filter(t=>t.text !== span.textContent);


            if(checkbox.checked){

                checked--;

            }
            else{

                unchecked--;

            }


            total--;


            li.remove();

            updateNumbers();
            updateCounters();

            saveTasks();
            checkEmpty()


        };
    
    }


        edit.onclick=function(){

            currentSpan=span;

            document.getElementById("edit_form").classList.add("show");

            document.getElementById("edit_task").value=span.textContent;

        };


        updateCounters();


        document.getElementById("tasks").value="";

    }
    closeduedate()

}


function closeform(){

    document.getElementById("edit_form").classList.remove("show");

}


function saveform(){

    let edited=document.getElementById("edit_task").value.trim();


    if(edited !== ""){


        let oldText=currentSpan.textContent;


        let taskObject=tasks.find(t=>t.text===oldText);


        if(taskObject){

            taskObject.text=edited;

        }


        currentSpan.textContent=edited;


        saveTasks();


    }


    closeform();

}

document.getElementById("tasks").addEventListener("keydown",function(event){

    if(event.key==="Enter"){

        add();

    }

});


window.onload=function(){


    tasks.forEach(function(item){


        document.getElementById("tasks").value=item.text;
    document.getElementById("duedate").value=item.duedate;

        add(true,item.checked);


    });


};

function checkEmpty(){

    let temp = document.getElementById("temp");

    if(total === 0){
        temp.style.display = "block";
    }
    else{
        temp.style.display = "none";
    }

}
function darkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

}
function filterTasks(type){

    let allTasks = document.querySelectorAll(".task-item");


    allTasks.forEach(function(task){


        let checkbox = task.querySelector(".task-check");


        if(type === "all"){

            task.style.display="flex";

        }


        else if(type === "completed"){

            if(checkbox.checked){

                task.style.display="flex";

            }
            else{

                task.style.display="none";

            }

        }


        else if(type === "pending"){

            if(!checkbox.checked){

                task.style.display="flex";

            }
            else{

                task.style.display="none";

            }

        }


    });

}
function clearall(){
    if(confirm("are you sure you want to clear all?")){
     console.log()
    localStorage.clear()
    location.reload()}
}
function search_task(){

    let search = document.getElementById("search").value.toLowerCase();

    let tasks = document.querySelectorAll(".task-item");

    tasks.forEach(function(task){

        let text = task.querySelector(".task-text").textContent.toLowerCase();

        if(text.includes(search)){
            task.style.display="flex";
        }
        else{
            task.style.display="none";
        }

    });

}
function openduedate(){
    let duedate=document.getElementById("duedate");
    duedate.style.display="flex"
    
}
function closeduedate(){
    let duedate=document.getElementById("duedate");
    duedate.style.display="none"
}
