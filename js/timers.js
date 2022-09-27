const timer = (taskObj) => {
	// Cuenta regresiva tiempo de trabajo
	if ($timeS.textContent !== "0") {
		$timeS.textContent--;
	} else if ($timeM.textContent !== "0" && $timeS.textContent !== "0") {
		$timeS.textContent = "59";
		$timeM.textContent--;
	}

	// Cuenta regresiva tiempo de descanso
	if ($timeM.textContent === "0" && $timeS.textContent === "0") {
		if ($breakS.textContent !== 0) {
			$breakS.textContent--;
		} else if ($breakM.textContent !== "0" && $breakS.textContent !== "0") {
			$breakS.textContent = "59";
			$breakM.textContent--;
		}
	}

	// Incrementar uno si el ciclo fue completado
	if ($timeM.textContent === "0" && $timeS.textContent === "0" && $breakM.textContent === "0" && $breakS.textContent === "0") {
		$timeM.textContent === taskObj.time;
		$timeS.textContent === "00";
		$breakM.textContent === taskObj.break;
		$breakS.textContent === "00";
	}
};
timer();
