/**
 * Singleton state to ensure only one overlay of each type is visible at a time.
 * When a new overlay opens, the previous one of the same type is automatically closed.
 */

type CloseCallback = () => void;

interface OverlayInstance {
	id: symbol;
	close: CloseCallback;
}

// Separate registries for different overlay types
// Using a plain object (not $state) to avoid SSR hydration issues
// Reactivity is not needed here since this is just for tracking/closing overlays
const registries: {
	actionBar: OverlayInstance | null;
	menu: OverlayInstance | null;
	select: OverlayInstance | null;
	combobox: OverlayInstance | null;
	popover: OverlayInstance | null;
} = {
	actionBar: null,
	menu: null,
	select: null,
	combobox: null,
	popover: null,
};

export type OverlayType = keyof typeof registries;

/**
 * Register an overlay as active. If another overlay of the same type is already active,
 * it will be closed first.
 * @param type - The overlay type
 * @param close - Callback to close this overlay
 * @returns The unique ID for this overlay instance
 */
export function registerOverlay(type: OverlayType, close: CloseCallback): symbol {
	const id = Symbol();

	// Close any existing overlay of the same type
	const existing = registries[type];
	if (existing && existing.id !== id) {
		existing.close();
	}

	registries[type] = { id, close };
	return id;
}

/**
 * Unregister an overlay when it closes.
 * @param type - The overlay type
 * @param id - The ID returned from registerOverlay
 */
export function unregisterOverlay(type: OverlayType, id: symbol): void {
	if (registries[type]?.id === id) {
		registries[type] = null;
	}
}
