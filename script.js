const form = document.querySelector("#todo-form");
const input = document.querySelector("#title");
const list = document.querySelector("#todo-list");

const load = () => {
    try {
        return JSON.parse(localStorage.getItem("tasks")) ?? [];
    } catch {
        return [];
    }
};
const save = (t) => localStorage.setItem("tasks", JSON.stringify(t));

let tasks = load();
render(tasks);


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = input.value.trim();

    if (!title) {
        alert("title is required");
        return;
    }

    tasks = [...tasks, { id: String(Date.now()), title, done: false }];

    save(tasks);
    render(tasks);

    form.reset();
    input.focus();
});

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.matches(".toggle")) {
        tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    }

    if (e.target.matches(".remove-btn")) {
        tasks = tasks.filter(t => t.id !== id);
    }

    save(tasks);
    render(tasks);
});

function render(items) {
    list.innerHTML = "";

    for (const task of items) {
        const li = document.createElement("li");

        li.dataset.id = task.id;
        li.className = "todo-item" + (task.done ? " done" : "");
        li.innerHTML = `
            <input type="checkbox" class="toggle" ${task.done ? "checked" : ""} />
            <span class="title"></span>
            <button type="button" class="remove-btn" aria-label="remove task">x</button>
        `;

        li.querySelector(".title").textContent = task.title; // seguro

        list.appendChild(li);
    }

}