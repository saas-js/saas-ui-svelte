<script lang="ts" module>
	// Track which toaster stores already have a Toaster component rendered
	const activeToasters = new WeakSet<object>();
</script>

<script lang="ts">
	import { Portal } from "@ark-ui/svelte/portal";
	import { onMount } from "svelte";
	import Toast from "./toast.svelte";
	import { type ToasterStore, type ToastData } from "./create-toaster.svelte";
	import { Box } from "$saas/layout/box";

	interface Props {
		toaster: ToasterStore;
		class?: string;
	}

	let { toaster, class: className }: Props = $props();

	const gap = 16;
	const baseBottom = 16;
	const animationDuration = 300;

	// Check if this toaster already has a Toaster component
	let isActive = $state(false);

	// Track heights - use a reactive object
	let heights = $state<Record<string, number>>({});

	// Track entering/exiting states
	let enteringToasts = $state<Set<string>>(new Set());
	let exitingToasts = $state<Set<string>>(new Set());

	// Subscribe to dismiss events from the toaster
	onMount(() => {
		// Only one Toaster per toaster store
		if (activeToasters.has(toaster)) {
			isActive = false;
			return;
		}

		activeToasters.add(toaster);
		isActive = true;

		const unsubscribe = toaster.subscribe((event, id) => {
			if (event === "dismiss") {
				startExitAnimation(id);
			}
		});

		return () => {
			unsubscribe();
			activeToasters.delete(toaster);
		};
	});

	function startExitAnimation(id: string) {
		// Don't animate if already exiting or toast doesn't exist
		if (exitingToasts.has(id)) return;
		if (!toaster.toasts.find((t) => t.id === id)) return;

		exitingToasts = new Set([...exitingToasts, id]);

		setTimeout(() => {
			exitingToasts = new Set([...exitingToasts].filter((i) => i !== id));
			toaster.remove(id);
			const newHeights = { ...heights };
			delete newHeights[id];
			heights = newHeights;
		}, animationDuration);
	}

	// Svelte action for mounting toasts
	function mountToast(el: HTMLDivElement, id: string) {
		// Mark as entering immediately
		enteringToasts = new Set([...enteringToasts, id]);

		// Measure height
		const h = el.offsetHeight;
		heights = { ...heights, [id]: h };

		// Use requestAnimationFrame to ensure the initial style is applied first
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				enteringToasts = new Set(
					[...enteringToasts].filter((i) => i !== id),
				);
			});
		});

		return {
			destroy() {
				// Cleanup handled by exit animation
			},
		};
	}

	// Calculate bottom offset for a toast
	// Toasts are ordered oldest first, newest last
	// Newest toast (last in array) is at the bottom (baseBottom)
	// Older toasts are stacked above
	function getBottomOffset(
		toasts: ToastData[],
		currentIndex: number,
	): number {
		let offset = 0;
		// Sum heights of all toasts AFTER this one (newer toasts = below this one)
		for (let i = currentIndex + 1; i < toasts.length; i++) {
			const toast = toasts[i];
			// Don't count exiting toasts in the offset
			if (exitingToasts.has(toast.id)) continue;
			// Don't count entering toasts that haven't been measured yet
			const h = heights[toast.id];
			if (h === undefined) continue;
			offset += h + gap;
		}
		return offset;
	}

	function getToastStyle(t: ToastData, index: number): string {
		const isEntering = enteringToasts.has(t.id);
		const isExiting = exitingToasts.has(t.id);
		const bottomOffset = getBottomOffset(toaster.toasts, index);

		if (isEntering) {
			// Start below viewport
			return `bottom: -100px; opacity: 0; transition: none;`;
		}

		if (isExiting) {
			// Fall down half the toast height and fade out
			const h = heights[t.id] || 56;
			return `bottom: ${baseBottom + bottomOffset - h / 2}px; opacity: 0; transition: bottom ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out; will-change: bottom, opacity;`;
		}

		// Normal position
		return `bottom: ${baseBottom + bottomOffset}px; opacity: 1; transition: bottom ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out; will-change: bottom, opacity;`;
	}
</script>

{#if isActive}
	<Portal>
		<Box
			class="pointer-events-none fixed inset-0 z-2147483647 overflow-hidden"
			role="region"
			aria-label="Notifications"
		>
			{#each toaster.toasts as t, index (t.id)}
				<div
					use:mountToast={t.id}
					class="pointer-events-auto absolute right-4 left-4 md:left-auto md:w-96"
					style={getToastStyle(t, index)}
				>
					<Toast
						status={t.type}
						title={t.title}
						description={t.description}
						action={t.action}
						onclose={() => toaster.dismiss(t.id)}
					/>
				</div>
			{/each}
		</Box>
	</Portal>
{/if}
