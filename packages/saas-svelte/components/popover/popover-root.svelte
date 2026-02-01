<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const POPOVER_CTX = Symbol("POPOVER_CTX");

	export const popover = tv({
		slots: {
			positioner: [
				"absolute",
				"isolate",
				"min-w-max",
				"z-popover",
				"has-data-nested:min-w-0",
				"has-data-nested:w-full",
			],
			content: [
				"flex",
				"flex-col",
				"relative",
				"w-80",
				"rounded-lg",
				"bg-bg-overlay",
				"backdrop-blur-lg",
				"text-fg-default",
				"text-sm",
				"leading-sm",
				"antialiased",
				"shadow-overlay",
				"outline-none",
				"pointer-events-auto",
				"data-[state=open]:animate-dialog-in",
				"data-[state=closed]:animate-dialog-out",
				"data-nested:max-w-none",
			],
			arrow: [
				"[--arrow-size:var(--spacing-3)]",
				"[--arrow-background:var(--color-bg-overlay)]",
			],
			arrowTip: [
				"border-l",
				"border-t",
				"border-border-subtle",
				"bg-bg-overlay",
			],
			header: [
				"flex",
				"items-center",
				"justify-between",
				"gap-4",
				"px-5",
				"pt-5",
				"pb-0",
				"text-fg-default",
			],
			body: ["flex-1", "p-5", "text-fg-default", "text-sm", "leading-sm"],
			footer: ["flex", "items-center", "gap-2", "px-5", "pt-0", "pb-5"],
			title: ["text-sm", "leading-sm", "font-medium", "text-fg-default"],
			description: ["text-sm", "leading-sm", "text-fg-muted"],
			closeTrigger: [
				"absolute",
				"top-2",
				"right-2",
				"flex",
				"items-center",
				"justify-center",
				"size-6",
				"rounded",
				"text-fg-muted",
				"hover:text-fg-default",
				"hover:bg-bg-subtle",
				"transition-colors",
				"duration-200",
				"cursor-pointer",
				"outline-none",
				"focus-visible:outline-1",
				"focus-visible:outline-solid",
				"focus-visible:outline-fg-muted",
				"focus-visible:outline-offset-2",
			],
		},
		variants: {
			size: {
				xs: {
					content: "max-w-2xs",
					body: "p-3",
					header: "px-3 pt-3 pb-0",
					footer: "px-3 pt-0 pb-3",
				},
				sm: {
					content: "max-w-xs",
					body: "p-4",
					header: "px-4 pt-4 pb-0",
					footer: "px-4 pt-0 pb-4",
				},
				md: {
					content: "max-w-xs",
					body: "p-5",
					header: "px-5 pt-5 pb-0",
					footer: "px-5 pt-0 pb-5",
				},
				lg: {
					content: "max-w-sm",
					body: "p-6",
					header: "px-6 pt-6 pb-0",
					footer: "px-6 pt-0 pb-6",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type PopoverVariants = VariantProps<typeof popover>;

	export interface PopoverContext {
		size: PopoverVariants["size"];
		styles: ReturnType<typeof popover>;
		portalled: boolean;
		onPrefetch?: () => void;
	}
</script>

<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import type { PopoverRootProps } from "@ark-ui/svelte/popover";
	import { setContext, type Snippet } from "svelte";
	import {
		registerOverlay,
		unregisterOverlay,
	} from "$saas/utils/overlay-singleton.svelte.js";

	interface Props extends Omit<PopoverRootProps, "id"> {
		/**
		 * The popover content.
		 */
		children: Snippet;
		/**
		 * The unique identifier for the popover.
		 */
		id?: string;
		/**
		 * The size of the popover.
		 * @default "md"
		 */
		size?: PopoverVariants["size"];
		/**
		 * Whether the popover is open.
		 */
		open?: boolean;
		/**
		 * Handler called when the open state changes.
		 */
		onOpenChange?: (details: { open: boolean }) => void;
		/**
		 * Whether to automatically set focus on the first focusable content when opened.
		 * @default true
		 */
		autoFocus?: boolean;
		/**
		 * Whether to close when the escape key is pressed.
		 * @default true
		 */
		closeOnEscape?: boolean;
		/**
		 * Whether to close when clicking outside.
		 * @default true
		 */
		closeOnInteractOutside?: boolean;
		/**
		 * Whether the popover should be modal.
		 * @default false
		 */
		modal?: boolean;
		/**
		 * Whether the popover is portalled.
		 * @default true
		 */
		portalled?: boolean;
		/**
		 * Whether to enable lazy mounting.
		 * @default false
		 */
		lazyMount?: boolean;
		/**
		 * Whether to unmount on exit.
		 * @default false
		 */
		unmountOnExit?: boolean;
		/**
		 * The positioning options for the popover.
		 */
		positioning?: PopoverRootProps["positioning"];
		/**
		 * Element to receive focus when the popover is opened.
		 */
		initialFocusEl?: () => HTMLElement | null;
		/**
		 * Callback invoked when hovering over the trigger (for prefetching content).
		 * Similar to Astro's link prefetching, this allows preloading data before opening.
		 */
		onPrefetch?: () => void;
	}

	let {
		children,
		id,
		size = "md",
		open = $bindable(),
		onOpenChange,
		autoFocus = true,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		modal = false,
		portalled = true,
		lazyMount = false,
		unmountOnExit = false,
		positioning = { placement: "bottom", gutter: 12 },
		initialFocusEl,
		onPrefetch,
		...rest
	}: Props = $props();

	const styles = $derived(popover({ size }));

	let instanceId: symbol | null = $state(null);

	function handleOpenChange(details: { open: boolean }) {
		if (details.open) {
			if (!instanceId) {
				instanceId = registerOverlay("popover", () => {
					onOpenChange?.({ open: false });
				});
			}
		} else if (instanceId) {
			unregisterOverlay("popover", instanceId);
			instanceId = null;
		}
		onOpenChange?.(details);
	}

	const ctx: PopoverContext = {
		get size() {
			return size ?? "md";
		},
		get styles() {
			return styles;
		},
		get portalled() {
			return portalled;
		},
		get onPrefetch() {
			return onPrefetch;
		},
	};

	setContext(POPOVER_CTX, ctx);
</script>

<Popover.Root
	{id}
	bind:open
	onOpenChange={handleOpenChange}
	{autoFocus}
	{closeOnEscape}
	{closeOnInteractOutside}
	{modal}
	{portalled}
	{lazyMount}
	{unmountOnExit}
	{positioning}
	{initialFocusEl}
	{...rest}
>
	{@render children?.()}
</Popover.Root>
