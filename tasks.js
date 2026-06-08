const taskinput = document.getElementById("taskinput");
const addbt = document.getElementById("addbt");
const tasklist = document.getElementById("tasklist");

let tasks = [];

function addtask() {
    const tasktext = taskinput.value.trim();

    if (tasktext === "") {
        return;
    }

    const taskobj = {
        text: tasktext,
        completed: false
    };

    tasks.push(taskobj);
    taskinput.value = "";
    savetask();
    renderTasks();
}

function renderTasks() {
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            savetask();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks.splice(index, 1);
            savetask();
            renderTasks();
        });

        li.appendChild(deleteBtn);

        tasklist.appendChild(li);
    });

}
function savetask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function loadtask(){
    const storedtask=localStorage.getItem("tasks");
    if(storedtask){
        tasks=JSON.parse(storedtask);
    }
    renderTasks();
}

addbt.addEventListener("click", addtask);
loadtask();