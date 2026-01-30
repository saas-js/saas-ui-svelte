// Shared state for mobile navigation menu
let sideMenuOpen = $state(false);

export function getSideMenuOpen() {
	return sideMenuOpen;
}

export function setSideMenuOpen(open: boolean) {
	sideMenuOpen = open;
}

export function closeMobileMenu() {
	sideMenuOpen = false;
}
