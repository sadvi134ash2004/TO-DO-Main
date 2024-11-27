const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let undoStack = JSON.parse(localStorage.getItem("undoStack")) || [];

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task.");
    } else {
        const li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            undoStack.push(e.target.parentElement.outerHTML);
            e.target.parentElement.remove();
            saveData();
            saveUndoStack();
        }
    },
    false
);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function saveUndoStack() {
    localStorage.setItem("undoStack", JSON.stringify(undoStack));
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ""; // Fallback for null data
}

function undoTask() {
    if (undoStack.length > 0) {
        const lastRemovedTask = undoStack.pop();
        listContainer.insertAdjacentHTML("beforeend", lastRemovedTask); 
        saveData();
        saveUndoStack();
    } else {
        alert("No tasks to undo!");
    }
}
showTask();