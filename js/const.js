const $body = document.querySelector("body");
// Timer
const $taskSelected = document.querySelector(".taskSelected");
const $timeLeft = document.querySelector(".timeLeft");

// Task Manager
const $day = document.querySelector(".day");
const $month = document.querySelector(".month");
const $year = document.querySelector(".year");

const $addTaskForm = document.querySelector(".addTaskForm");
const $addTaskInp = document.querySelector(".addTaskInp");
const $addTaskBtn = document.querySelector(".addTaskBtn");

const $myTasks = document.querySelector(".myTasks");
const $modalContainer = document.querySelector(".modalContainer");

const $openModalTask = document.querySelector(".openModalTask");
const $closeModal = document.querySelector(".fa-x");

const openModal = () => {
	$modalContainer.style.display = "flex";
	$body.style.position = "static";
	$body.style.heigth = "100%";
	$body.style.overflow = "hidden";
};

const closeModal = () => {
	$modalContainer.style.display = "none";
	$body.style.position = "inherit";
	$body.style.heigth = "auto";
	$body.style.overflow = "visible";
};

$openModalTask.addEventListener("click", openModal);
$closeModal.addEventListener("click", closeModal);
