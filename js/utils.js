const openModal = (modal) => {
	modal.style.display = "flex";
	$body.style.position = "static";
	$body.style.heigth = "100%";
	$body.style.overflow = "hidden";
};

const closeModal = (modal) => {
	modal.style.display = "none";
	$body.style.position = "inherit";
	$body.style.heigth = "auto";
	$body.style.overflow = "visible";
};
