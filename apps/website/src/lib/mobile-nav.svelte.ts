// Shared state for coordinating mobile navigation menus
let navbarMenuOpen = $state(false);
let sideMenuOpen = $state(false);

export function getNavbarMenuOpen() {
    return navbarMenuOpen;
}

export function setNavbarMenuOpen(open: boolean) {
    navbarMenuOpen = open;
    if (open) {
        sideMenuOpen = false;
    }
}

export function getSideMenuOpen() {
    return sideMenuOpen;
}

export function setSideMenuOpen(open: boolean) {
    sideMenuOpen = open;
    if (open) {
        navbarMenuOpen = false;
    }
}

export function getAnyMenuOpen() {
    return navbarMenuOpen || sideMenuOpen;
}

export function closeAllMobileMenus() {
    navbarMenuOpen = false;
    sideMenuOpen = false;
}
