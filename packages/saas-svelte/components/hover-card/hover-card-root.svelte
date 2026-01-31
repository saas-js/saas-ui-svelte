<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const HOVER_CARD_CTX = Symbol("HOVER_CARD_CTX");

/**
 * Tailwind Variants styles for the HoverCard component.
 */
export const hoverCard = tv({
	slots: {
		positioner: ["absolute", "isolate", "min-w-max", "z-popover"],
		content: [
			"flex",
			"flex-col",
			"relative",
			"w-80",
			"max-w-80",
			"rounded-md",
			"bg-bg-overlay",
			"backdrop-blur-lg",
			"text-fg-default",
			"text-sm",
			"leading-sm",
			"antialiased",
			"shadow-overlay",
			"border",
			"border-border-subtle",
			"outline-none",
			"pointer-events-auto",
			"p-4",
			"data-[state=open]:animate-dialog-in",
			"data-[state=closed]:animate-dialog-out",
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
	},
	variants: {
		size: {
			xs: {
				content: "max-w-2xs p-3 text-xs leading-xs",
			},
			sm: {
				content: "max-w-xs p-3 text-xs leading-xs",
			},
			md: {
				content: "max-w-xs p-4 text-sm leading-sm",
			},
			lg: {
				content: "max-w-sm p-4 text-sm leading-sm",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type HoverCardVariants = VariantProps<typeof hoverCard>;

export interface HoverCardContext {
	size: HoverCardVariants["size"];
	styles: ReturnType<typeof hoverCard>;
	portalled: boolean;
	open: boolean;
	setOpen: (open: boolean) => void;
	onPrefetch?: () => void;
}
</script>

<script lang="ts">
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";
import { setContext, type Snippet } from "svelte";

interface Props extends Omit<HoverCardRootProps, "id"> {
	/**
	 * The hover card content.
	 */
	children: Snippet;
	/**
	 * The unique identifier for the hover card.
	 */
	id?: string;
	/**
	 * The size of the hover card.
	 * @default "md"
	 */
	size?: HoverCardVariants["size"];
	/**
	 * Whether the hover card is open.
	 */
	open?: boolean;
	/**
	 * Handler called when the open state changes.
	 */
	onOpenChange?: (details: { open: boolean }) => void;
	/**
	 * The duration from when the mouse enters the trigger until the hover card opens.
	 * @default 700
	 */
	openDelay?: number;
	/**
	 * The duration from when the mouse leaves the trigger or content until the hover card closes.
	 * @default 300
	 */
	closeDelay?: number;
	/**
	 * Whether the hover card is portalled.
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
	 * The positioning options for the hover card.
	 */
	positioning?: HoverCardRootProps["positioning"];
	/**
	 * Callback invoked when hovering over the trigger (for prefetching content).
	 * Similar to Astro's link prefetching, this allows preloading data before the hover card opens.
	 */
	onPrefetch?: () => void;
}

let {
	children,
	id,
	size = "md",
	open = $bindable(),
	onOpenChange,
	openDelay = 700,
	closeDelay = 300,
	portalled = true,
	lazyMount = false,
	unmountOnExit = false,
	positioning = { placement: "bottom", gutter: 12 },
	onPrefetch,
	...rest
}: Props = $props();


const styles = $derived(hoverCard({ size }));

function setOpen(value: boolean) {
	open = value;
	onOpenChange?.({ open: value });
}

const ctx: HoverCardContext = {
	get size() {
		return size ?? "md";
	},
	get styles() {
		return styles;
	},
	get portalled() {
		return portalled;
	},
	get open() {
		return open ?? false;
	},
	setOpen,
	get onPrefetch() {
		return onPrefetch;
	},
};

setContext(HOVER_CARD_CTX, ctx);
</script>

<HoverCard.Root
	id={id}
	bind:open={open}
	onOpenChange={(e) => onOpenChange?.(e)}
	openDelay={openDelay}
	closeDelay={closeDelay}
	lazyMount={lazyMount}
	unmountOnExit={unmountOnExit}
	positioning={positioning}
	{...rest}
>
	{@render children()}
</HoverCard.Root>
