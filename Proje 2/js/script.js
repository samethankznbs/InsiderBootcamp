document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterOptions = document.createElement("select");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.display = "none";
    taskForm.insertBefore(errorMessage, taskForm.querySelector("button"));

    filterOptions.innerHTML = `
        <option value="all">Tüm Görevler</option>
        <option value="completed">Tamamlananlar</option>
        <option value="notCompleted">Tamamlanmayanlar</option>
        <option value="lowHigh">Öncelik: Düşük → Yüksek</option>
        <option value="highLow">Öncelik: Yüksek → Düşük</option>
    `;
    taskList.parentElement.insertBefore(filterOptions, taskList);

    let tasks = [];

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        try {
            const title = document.getElementById("taskTitle").value;
            const description = document.getElementById("taskDescription").value;
            const priorityElement = document.querySelector("input[name='priority']:checked");
            
            if (!priorityElement) {
                errorMessage.textContent = "Lütfen bir öncelik seçin.";
                errorMessage.style.display = "block";
                return;
            }
            
            errorMessage.style.display = "none";
            const priority = priorityElement.value;

            const task = {
                title,
                description,
                priority,
                completed: false,
            };

            tasks.push(task);
            renderTasks();
            taskForm.reset();
        } catch (error) {
            console.error("Görev ekleme hatası:", error);
        }
    });

    function renderTasks() {
        taskList.innerHTML = "";
        let filteredTasks = tasks.map((task, index) => ({ ...task, originalIndex: index }));

        if (filterOptions.value === "completed") {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (filterOptions.value === "notCompleted") {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (filterOptions.value === "lowHigh") {
            filteredTasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
        } else if (filterOptions.value === "highLow") {
            filteredTasks.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
        }

        filteredTasks.forEach((task) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            if (task.completed) {
                taskElement.classList.add("completed");
            }

            taskElement.innerHTML = `
                <div>
                    <strong>${task.title}</strong> - ${task.description}
                    <br><small>Öncelik: ${task.priority}</small>
                </div>
                <div class="actions">
                    <button class="toggle-btn" data-index="${task.originalIndex}">${task.completed ? "Geri Al" : "Tamamla"}</button>
                    <button class="delete-btn" data-index="${task.originalIndex}">Sil</button>
                </div>
            `;

            taskList.appendChild(taskElement);
        });
    }

    taskList.addEventListener("click", function (event) {
        event.stopPropagation();
        const target = event.target;

        if (target.classList.contains("toggle-btn")) {
            const index = target.getAttribute("data-index");
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }

        if (target.classList.contains("delete-btn")) {
            const index = target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    filterOptions.addEventListener("change", renderTasks);

    function priorityValue(priority) {
        return priority === "Düşük" ? 1 : priority === "Orta" ? 2 : 3;
    }

    renderTasks();
});
