<script module lang="ts">
export const DRAWER_CTX = Symbol("DRAWER_CTX");

export interface DrawerContext {
	size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	placement: "start" | "end" | "top" | "bottom";
	attached: boolean;
	onPrefetch?: () => void;
}
</script>

<script lang="ts">
import { Dialog } from "@ark-ui/svelte/dialog";
import { setContext, type Snippet } from "svelte";

interface Props {
	/**
	 * The drawer content.
	 */
	children: Snippet;
	/**
	 * Whether the drawer is open.
	 * @default false
	 */
	open?: boolean;
	/**
	 * Handler called when the open state changes.
	 */
	onOpenChange?: (details: { open: boolean }) => void;
	/**
	 * The size of the drawer.
	 * @default "sm"
	 */
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	/**
	 * The placement of the drawer.
	 * @default "end"
	 */
	placement?: "start" | "end" | "top" | "bottom";
	/**
	 * Whether the drawer is attached to the edge of the viewport (no padding/rounded corners).
	 * @default false
	 */
	attached?: boolean;
	/**
	 * The role of the drawer.
	 * @default "dialog"
	 */
	role?: "dialog" | "alertdialog";
	/**
	 * Element to receive focus when the drawer is opened.
	 */
	initialFocusEl?: () => HTMLElement | null;
	/**
	 * Element to receive focus when the drawer is closed.
	 */
	finalFocusEl?: () => HTMLElement | null;
	/**
	 * Whether to restore focus to the element that had focus before the drawer was opened.
	 * @default true
	 */
	restoreFocus?: boolean;
	/**
	 * Whether to lazily mount the drawer content.
	 */
	lazyMount?: boolean;
	/**
	 * Whether to unmount the drawer on exit.
	 */
	unmountOnExit?: boolean;
	/**
	 * Callback invoked when hovering over the trigger (for prefetching content).
	 * Similar to Astro's link prefetching, this allows preloading data before opening.
	 */
	onPrefetch?: () => void;
	[key: string]: any;
}

let {
	children,
	open = $bindable(false),
	onOpenChange,
	size = "sm",
	placement = "end",
	attached = false,
	role = "dialog",
	initialFocusEl,
	finalFocusEl,
	restoreFocus,
	lazyMount,
	unmountOnExit,
	onPrefetch,
	...restProps
}: Props = $props();

// Reactive context state
let contextState = $state<DrawerContext>({
	size: "sm",
	placement: "end",
	attached: false,
	onPrefetch: undefined,
});

$effect(() => {
	contextState.size = size;
	contextState.placement = placement;
	contextState.attached = attached;
	contextState.onPrefetch = onPrefetch;
});

setContext<DrawerContext>(DRAWER_CTX, contextState);
</script>

<Dialog.Root
	bind:open={open}
	onOpenChange={(e) => onOpenChange?.(e)}
	role={role}
	initialFocusEl={initialFocusEl}
	finalFocusEl={finalFocusEl}
	restoreFocus={restoreFocus}
	lazyMount={lazyMount}
	unmountOnExit={unmountOnExit}
	{...restProps}
>
	{@render children?.()}
</Dialog.Root>
