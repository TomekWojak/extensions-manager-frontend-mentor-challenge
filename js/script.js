document.addEventListener("DOMContentLoaded", function () {
	const modeToggler = document.querySelector(".header__mode-toggler");
	const removeBtns = document.querySelectorAll(".extensions__extension-remove");
	const activateBtns = document.querySelectorAll(
		".extensions__extension-activate"
	);

	const handleMode = () => {
		const body = document.body;
		let theme;
		if (body.classList.contains("dark")) {
			theme = localStorage.setItem("theme", "light");
			body.classList.remove("dark");
			modeToggler.setAttribute("aria-label", "Set dark mode");
		} else {
			theme = localStorage.setItem("theme", "dark");
			body.classList.add("dark");
			modeToggler.setAttribute("aria-label", "Set light mode");
		}
	};

	const loadMode = () => {
		const mode = localStorage.getItem("theme");
		const body = document.body;
		if (mode === "light") {
			body.classList.remove("dark");
			modeToggler.setAttribute("aria-label", "Set dark mode");
		} else {
			body.classList.add("dark");
			modeToggler.setAttribute("aria-label", "Set light mode");
		}
	};

	const loadActiveState = () => {
		const allExtensions = document.querySelectorAll(".extensions__extension");
		allExtensions.forEach((el) => {
			const id = el.dataset.id;
			const state = localStorage.getItem(`active-${id}`);
			if (state === "true") {
				el.setAttribute("aria-label", "Disable extension");
				el.classList.add("active");
			} else {
				el.setAttribute("aria-label", "Activate extension");
				el.classList.remove("active");
			}
		});
	};

	activateBtns.forEach((el) =>
		el.addEventListener("click", () => {
			const parent = el.closest(".extensions__extension");
			if (parent.classList.contains("active")) {
				el.setAttribute("aria-label", "Activate extension");
				parent.classList.remove("active");
			} else {
				el.setAttribute("aria-label", "Disable extension");
				parent.classList.add("active");
			}
			const parentId = parent.dataset.id;
			const isActive = parent.classList.contains("active");
			localStorage.setItem(`active-${parentId}`, isActive);
		})
	);
	removeBtns.forEach((el) =>
		el.addEventListener("click", () => {
			const parent = el.closest(".extensions__extension");
			parent.remove();
		})
	);
	loadActiveState();
	loadMode();
	modeToggler.addEventListener("click", handleMode);
});
