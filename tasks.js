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
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (event) => {
         

            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(deleteBtn);

        tasklist.appendChild(li);
    });
}

addbt.addEventListener("click", addtask);