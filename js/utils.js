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

const notify = (title, msg, img) => {
	const notification = new Notification(title, {
		icon: img,
		body: msg,
	});
};

const notificationPermission = () => {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
};
