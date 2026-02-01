<script module lang="ts">
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";

	export const COLLAPSIBLE_CTX = Symbol("COLLAPSIBLE_CTX");

	export interface CollapsibleContext {
		disabled: boolean;
		onPrefetch?: () => void;
	}

	export const collapsibleRoot = tv({
		base: ["antialiased"],
	});

	export const collapsibleContent = tv({
		base: [
			"overflow-hidden",
			"data-[state=open]:animate-collapsible-down",
			"data-[state=closed]:animate-collapsible-up",
		],
	});

	export const collapsibleIndicator = tv({
		base: [
			"inline-flex",
			"items-center",
			"justify-center",
			"transition-transform",
			"duration-200",
			"data-[state=open]:rotate-90",
		],
	});
</script>

<script lang="ts">
	import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
	import type { CollapsibleRootProps } from "@ark-ui/svelte/collapsible";
	import { setContext, type Snippet } from "svelte";

	interface Props extends Omit<CollapsibleRootProps, "id"> {
		/**
		 * The unique identifier for the collapsible.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * Whether the collapsible is open by default.
		 * Use when you don't need to control the open state.
		 */
		defaultOpen?: boolean;
		/**
		 * The controlled open state of the collapsible.
		 */
		open?: boolean;
		/**
		 * Whether the collapsible is disabled.
		 */
		disabled?: boolean;
		/**
		 * Whether to enable lazy mounting of content.
		 * @default false
		 */
		lazyMount?: boolean;
		/**
		 * Whether to unmount the content when collapsed.
		 * @default false
		 */
		unmountOnExit?: boolean;
		/**
		 * Callback invoked when the open state changes.
		 */
		onOpenChange?: CollapsibleRootProps["onOpenChange"];
		/**
		 * Callback invoked when the exit animation completes.
		 */
		onExitComplete?: CollapsibleRootProps["onExitComplete"];
		/**
		 * The content of the collapsible.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply to the root.
		 */
		class?: string;
		/**
		 * Callback invoked when hovering over the trigger (for prefetching content).
		 * Similar to Astro's link prefetching, this allows preloading data before expanding.
		 */
		onPrefetch?: () => void;
	}

	let {
		id,
		defaultOpen,
		open,
		disabled,
		lazyMount = false,
		unmountOnExit = false,
		onOpenChange,
		onExitComplete,
		children,
		class: className,
		onPrefetch,
		...rest
	}: Props = $props();

	setContext<CollapsibleContext>(COLLAPSIBLE_CTX, {
		get disabled() {
			return disabled ?? false;
		},
		get onPrefetch() {
			return onPrefetch;
		},
	});
</script>

<ArkCollapsible.Root
	{id}
	{defaultOpen}
	{open}
	{disabled}
	{lazyMount}
	{unmountOnExit}
	{onOpenChange}
	{onExitComplete}
	class={twMerge(collapsibleRoot(), className as string)}
	{...rest}
>
	{@render children?.()}
</ArkCollapsible.Root>
