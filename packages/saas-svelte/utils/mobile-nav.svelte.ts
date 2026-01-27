export function createMobileNav(breakpoint: number = 768) {
    let open = $state(false);

    if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
        mediaQuery.addEventListener("change", () => {
            if (mediaQuery.matches) {
                open = false;
            }
        });
    }

    return {
        get open() {
            return open;
        },
        set open(value: boolean) {
            open = value;
        },
        toggle() {
            open = !open;
        },
    };
}
