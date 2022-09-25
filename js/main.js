// Funciones de local Storage
let tasks = JSON.parse(localStorage.getItem("tasksList")) || [];

const saveToLocalStorage = (tasksList) => {
	localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

// Funcion que arma el <li> para ser mostrado
const renderList = (task) => {
	return `
        <li data-id="${task.name}">
            <div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <p>${task.name}</p>
            </div>
            <i class="fa-solid fa-arrow-right"></i>
        </li>
    `;
};

// Funcion que muestra el <li> en pantalla
const showList = (taskList) => {
	$myTasks.innerHTML = taskList.map((task) => renderList(task)).join("");
};

// Funcion para crear el objeto task
const createTaskObj = (taskName) => {
	const obj = {
		name: taskName,
		time: 25,
		break: 5,
		round: 0,
		color: null,
	};
	return obj;
};

// Funcion para validar la task
const isTaskValid = (taskName) => {
	if (!taskName.length) {
		alert("You can't enter empty tasks");
		return false;
	} else if (tasks.some((task) => task.name.toUpperCase() === taskName.toUpperCase())) {
		alert("That task already exists");
		return false;
	}
	return true;
};

// Funcion para añadir una tarea al taskManager
const addTask = (e) => {
	e.preventDefault();
	const taskName = $addTaskInp.value.trim();
	if (!isTaskValid(taskName)) return;

	const taskObj = createTaskObj(taskName);
	tasks = [...tasks, taskObj];
	saveToLocalStorage(tasks);
	showList(tasks);

	input.value = "";
};

const init = () => {
	showList(tasks);
	$addTaskForm.addEventListener("submit", addTask);
};
init();
