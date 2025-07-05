document.addEventListener("DOMContentLoaded", function () {
	const modeToggler = document.querySelector(".header__mode-toggler");
	const removeBtns = document.querySelectorAll(".extensions__extension-remove");
	const activateBtns = document.querySelectorAll(
		".extensions__extension-activate"
	);
	const allExtensions = document.querySelectorAll(".extensions__extension");
	const controls = document.querySelector(".extensions__controls");
	const errorInfo = document.querySelector(".empty-info");

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
	const handleFilter = (e) => {
		const allBtns = controls.querySelectorAll(".extensions__btn");
		allBtns.forEach((btn) => btn.classList.remove("current"));
		e.target.classList.add("current");
		if (e.target.matches(".extensions__btn--all")) {
			showAllExtensions(allExtensions);
			errorInfo.style.display = "none";
		} else if (e.target.matches(".extensions__btn--active")) {
			hideInactive(allExtensions);
		} else if (e.target.matches(".extensions__btn--inactive")) {
			hideActive(allExtensions);
			errorInfo.style.display = "none";
		}
	};

	const hideInactive = (extensions) => {
		showAllExtensions(allExtensions);

		extensions.forEach((el) => {
			if (!el.classList.contains("active")) {
				el.style.display = "none";
			}
		});
		checkIfEmpty();
	};
	const checkIfEmpty = () => {
		const activeExtensions = Array.from(allExtensions).filter((el) =>
			el.classList.contains("active")
		);
		if (activeExtensions.length === 0) {
			errorInfo.style.display = "block";
		} else {
			errorInfo.style.display = "none";
		}
	};
	const hideActive = (extension) => {
		showAllExtensions(allExtensions);
		extension.forEach((el) => {
			if (el.classList.contains("active")) {
				el.style.display = "none";
			}
		});
	};
	const showAllExtensions = (extension) => {
		extension.forEach((el) => (el.style.display = "block"));
	};
	const loadMode = () => {
		const mode = localStorage.getItem("theme");
		const body = document.body;
		if (mode === "dark") {
			body.classList.add("dark");
			modeToggler.setAttribute("aria-label", "Set light mode");
		} else {
			body.classList.remove("dark");
			modeToggler.setAttribute("aria-label", "Set dark mode");
		}
	};

	const loadActiveState = () => {
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
			const parentId = parent.dataset.id;
			parent.classList.remove("active");
			parent.remove();
			localStorage.removeItem(`active-${parentId}`);

			const isActive = document.querySelector('.extensions__btn--active').classList.contains('current')
			if(isActive){
				checkIfEmpty()
			}
		})
	);
	controls.addEventListener("click", handleFilter);
	loadActiveState();
	loadMode();
	modeToggler.addEventListener("click", handleMode);
});
