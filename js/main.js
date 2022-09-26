// Funciones de local Storage
let tasks = JSON.parse(localStorage.getItem("tasksList")) || [];

const saveToLocalStorage = (tasksList) => {
	localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

// Funcion que arma el <li> para ser mostrado
const renderList = (task) => {
	return `
		<li>
			<div class="taskName">
				<i class="fa-solid fa-ellipsis-vertical submenu" data-id="${task.name}"></i>
				<p>${task.name}</p>
			</div>
			<i class="fa-solid fa-arrow-right"></i>
			<div class="options" id="${task.name}">
				<p class="editTask">Editar tarea</p>
				<p class="deleteTask">Borrar tarea</p>
			</div>
		</li>
    `;
};

// Funcion que muestra el <li> en pantalla
const showList = (taskList) => {
	$myTasks.innerHTML = taskList.map((task) => renderList(task)).join("");
};

// Funcion para crear el objeto task
const createTaskObj = () => {
	const obj = {
		name: $addTaskInp.value.trim(),
		time: $addTaskTime.value.trim(),
		break: $addTaskBreak.value.trim(),
		round: 0,
		color: null,
	};
	closeModal($addTaskModal);
	return obj;
};

// Funcion para validar la task
const isTaskValid = (taskName) => {
	if (!taskName.length) {
		return false;
	} else if (tasks.some((task) => task.name.toUpperCase() === taskName.toUpperCase())) {
		alert("Esa tarea ya existe");
		return false;
	}

	return true;
};

// Funcion para añadir una tarea al taskManager
const addTask = (e) => {
	e.preventDefault();
	const taskName = $addTaskInp.value.trim();
	if (!isTaskValid(taskName)) return;

	const taskObj = createTaskObj();
	tasks = [...tasks, taskObj];
	saveToLocalStorage(tasks);
	showList(tasks);
};

// Funcion de opciones de submenu
const submenu = (e) => {
	if (!e.target.classList.contains("submenu")) return;

	const name = e.target.dataset.id;
	const $submenuId = document.getElementById(name);

	displaySubmenu($submenuId, name);
};

// Funcion para borrar la tarea
const deleteTask = (name) => {
	tasks = tasks.filter((task) => task.name !== name);
	saveToLocalStorage(tasks);
	showList(tasks);
};

// Funcion para actualizar el objeto
const updateObj = (name, taskToEdit) => {
	taskToEdit[0].name = $editTaskName.value;
	taskToEdit[0].time = $editTaskTime.value;
	taskToEdit[0].break = $editTaskBreak.value;
	tasks = tasks.map((task) => {
		if (task.name === name) {
			return taskToEdit[0];
		} else {
			return task;
		}
	});
	saveToLocalStorage(tasks);
	showList(tasks);
};

// Funcion para editar la tarea
const editTask = (name) => {
	const taskToEdit = tasks.filter((task) => task.name === name);
	openModal($editTaskModal);
	$editTaskName.value = taskToEdit[0].name;
	$editTaskTime.value = taskToEdit[0].time;
	$editTaskBreak.value = taskToEdit[0].break;
	$editTaskForm.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log(taskToEdit);
		console.log("pre");
		if (!isTaskValid($editTaskName.value)) return;
		console.log("post");
		updateObj(name, taskToEdit);
		closeModal($editTaskModal);
	});
};

// Funcion para mostrar y ocultar el submenu
const displaySubmenu = ($submenuId, name) => {
	$submenuId.style.display = "flex";
	$body.addEventListener("click", (e) => {
		if (!e.target.classList.contains("submenu")) {
			$submenuId.style.display = "none";
		}
	});
	$submenuId.addEventListener("click", (e) => {
		e.target.classList.contains("editTask") ? editTask(name) : deleteTask(name);
	});
};

const init = () => {
	showList(tasks);
	$openModalTask.addEventListener("click", () => {
		openModal($addTaskModal);
	});
	$closeModalTask.addEventListener("click", () => {
		closeModal($addTaskModal);
	});
	$closeModalEdit.addEventListener("click", () => {
		closeModal($editTaskModal);
	});
	$addTaskForm.addEventListener("submit", addTask);
	$myTasks.addEventListener("click", submenu);
};
init();
