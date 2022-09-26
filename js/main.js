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
				<i class="fa-solid fa-ellipsis-vertical submenu" data-id="${task.name}-${task.time}-${task.break}"></i>
				<p>${task.name}</p>
			</div>
			<i class="fa-solid fa-arrow-right"></i>
			<div class="options" id="${task.name}-${task.time}-${task.break}">
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
		timeLeft: 0,
		round: 0,
		color: null,
	};
	return obj;
};

// Funcion para añadir una tarea al taskManager
const addTask = (e) => {
	e.preventDefault();

	const taskObj = createTaskObj();
	tasks = [...tasks, taskObj];

	closeModal($addTaskModal);
	saveToLocalStorage(tasks);
	showList(tasks);
	weHaveWork();
};

// Funcion de opciones de submenu
const submenu = (e) => {
	if (!e.target.classList.contains("submenu")) return;

	const id = e.target.dataset.id;
	const data = id.split("-");
	const $submenuId = document.getElementById(id);

	displaySubmenu($submenuId, data);
};

// Funcion para comprobar si la data es coincidente
const isDataValid = (data, task) => {
	return task.name === data[0] && task.time === data[1] && task.break === data[2];
};

// Funcion para borrar la tarea
const deleteTask = (data) => {
	tasks = tasks.filter((task) => !isDataValid(data, task));
	saveToLocalStorage(tasks);
	showList(tasks);
	weHaveWork();
};

// Funcion para actualizar el objeto
const updateObj = (data, taskToEdit) => {
	taskToEdit[0].name = $editTaskName.value.trim();
	taskToEdit[0].time = $editTaskTime.value.trim();
	taskToEdit[0].break = $editTaskBreak.value.trim();
	tasks = tasks.map((task) => {
		if (isDataValid(data, task)) {
			return taskToEdit[0];
		} else {
			return task;
		}
	});
	saveToLocalStorage(tasks);
	showList(tasks);
};

// Funcion para editar la tarea
const editTask = (data) => {
	openModal($editTaskModal);
	const taskToEdit = tasks.filter((task) => isDataValid(data, task));

	$editTaskName.value = taskToEdit[0].name;
	$editTaskTime.value = taskToEdit[0].time;
	$editTaskBreak.value = taskToEdit[0].break;

	$editTaskForm.addEventListener("submit", (e) => {
		e.preventDefault();
		updateObj(data, taskToEdit);
		closeModal($editTaskModal);
	});
};

// Funcion para mostrar y ocultar el submenu
const displaySubmenu = ($submenuId, data) => {
	$submenuId.style.display = "flex";
	$body.addEventListener("click", (e) => {
		if (!e.target.classList.contains("submenu")) {
			$submenuId.style.display = "none";
		}
	});
	$submenuId.addEventListener("click", (e) => {
		e.target.classList.contains("editTask") ? editTask(data) : deleteTask(data);
	});
};

// Funcion que verifica si hay tareas
const weHaveWork = () => {
	if (tasks.length === 0) {
		$noWork.style.display = "block";
	} else {
		$noWork.style.display = "none";
	}
};
const init = () => {
	showList(tasks);
	weHaveWork();
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
