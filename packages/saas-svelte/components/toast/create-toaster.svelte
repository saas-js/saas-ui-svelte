<script module lang="ts">
import type { ToastStatus } from "./toast.svelte";

export interface ToastData {
	id: string;
	type: ToastStatus;
	title?: string;
	description?: string;
	action?: { label: string; onClick?: () => void };
	duration?: number;
}

export interface ToasterStore {
	toasts: ToastData[];
	create: (options: Omit<ToastData, "id">) => string;
	dismiss: (id: string) => void;
	remove: (id: string) => void;
	dismissAll: () => void;
	subscribe: (callback: (event: "dismiss", id: string) => void) => () => void;
}

export interface CreateToasterOptions {
	placement?:
		| "top"
		| "top-start"
		| "top-end"
		| "bottom"
		| "bottom-start"
		| "bottom-end";
	duration?: number;
	gap?: number;
	overlap?: boolean;
}

let toastCounter = 0;

export function createToaster(
	options: CreateToasterOptions = {},
): ToasterStore {
	const { duration: defaultDuration = 5000 } = options;

	let toasts = $state<ToastData[]>([]);
	let listeners: Set<(event: "dismiss", id: string) => void> = new Set();

	function create(opts: Omit<ToastData, "id">): string {
		const id = `toast-${++toastCounter}`;
		const duration = opts.duration ?? defaultDuration;

		const toast: ToastData = {
			id,
			type: opts.type ?? "info",
			title: opts.title,
			description: opts.description,
			action: opts.action,
			duration,
		};

		toasts = [...toasts, toast];

		if (duration !== Infinity && duration > 0) {
			setTimeout(() => {
				dismiss(id);
			}, duration);
		}

		return id;
	}

	// Called to start dismiss animation - notifies listeners
	function dismiss(id: string): void {
		for (const listener of listeners) {
			listener("dismiss", id);
		}
	}

	// Called to actually remove from array after animation
	function remove(id: string): void {
		toasts = toasts.filter((t) => t.id !== id);
	}

	function dismissAll(): void {
		for (const toast of toasts) {
			dismiss(toast.id);
		}
	}

	function subscribe(
		callback: (event: "dismiss", id: string) => void,
	): () => void {
		listeners.add(callback);
		return () => listeners.delete(callback);
	}

	return {
		get toasts() {
			return toasts;
		},
		create,
		dismiss,
		remove,
		dismissAll,
		subscribe,
	};
}
</script>
