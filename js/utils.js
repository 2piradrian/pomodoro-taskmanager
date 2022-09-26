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
