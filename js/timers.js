var timerIsOn = false;
let taskObj = tasks[0];

const timer = () => {
	// Cuenta regresiva tiempo de trabajo
	if ($timeS.textContent !== "00") {
		$timeS.textContent--;
		$timeS.textContent = $timeS.textContent.toString().padStart(2, "0");
	} else if ($timeM.textContent !== "00" && $timeS.textContent == "00") {
		$timeS.textContent = "59";
		$timeM.textContent--;
		$timeM.textContent = $timeM.textContent.toString().padStart(2, "0");
	}

	// Cuenta regresiva tiempo de descanso
	if ($timeM.textContent === "00" && $timeS.textContent === "00") {
		if ($breakS.textContent !== "00") {
			$breakS.textContent--;
			$breakS.textContent = $breakS.textContent.toString().padStart(2, "0");
		} else if ($breakM.textContent !== "00" && $breakS.textContent == "00") {
			$breakS.textContent = "59";
			$breakM.textContent--;
			$breakM.textContent = $breakM.textContent.toString().padStart(2, "0");
		}
	}

	// Incrementar uno si el ciclo fue completado
	if ($timeM.textContent === "00" && $timeS.textContent === "00" && $breakM.textContent === "00" && $breakS.textContent === "00") {
		$timeM.textContent = taskObj.time.toString().padStart(2, "0");
		$timeS.textContent = "00";
		$breakM.textContent = taskObj.break.toString().padStart(2, "0");
		$breakS.textContent = "00";

		taskObj.round++;
		clearInterval(timerIsOn);
		timerIsOn = false;
	}
};

$play.addEventListener("click", () => {
	if (!timerIsOn) {
		timerIsOn = setInterval(timer, 1000);
	} else {
		alert("La tarea ya está en curso.");
	}
});

$pause.addEventListener("click", () => {
	clearInterval(timerIsOn);
	timerIsOn = false;
});
