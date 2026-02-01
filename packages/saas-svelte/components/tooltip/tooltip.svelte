<script module lang="ts">
	import { popoverContentStyles } from "$saas/components/shared/popover-content.svelte";

	export type TooltipVariants = {
		variant?: "default" | "inverted";
	};
</script>

<script lang="ts">
	import { Tooltip as ArkTooltip } from "@ark-ui/svelte/tooltip";
	import { Portal } from "$saas/components/portal";
	import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";
	import type { Snippet } from "svelte";

	// Omit 'id' from the strict type so we can make it optional in our interface
	interface Props extends Omit<TooltipRootProps, "id"> {
		/**
		 * The unique identifier for the tooltip.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * Whether to close the tooltip when the trigger is clicked.
		 * @default true
		 */
		closeOnPointerDown?: boolean;
		/**
		 * The text content of the tooltip.
		 * Can be a string, snippet, or use children when trigger prop is provided.
		 */
		content?: string | Snippet;
		/**
		 * The trigger element (default usage).
		 * When trigger prop is provided, children become the content instead.
		 */
		children?: Snippet;
		/**
		 * Alternative trigger element. When provided, children become the content.
		 */
		trigger?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to show an arrow pointing to the trigger element.
		 * @default false
		 */
		showArrow?: boolean;
		/**
		 * The variant of the tooltip.
		 * @default "default"
		 */
		variant?: TooltipVariants["variant"];
		/**
		 * The delay before the tooltip opens (in ms).
		 * @default 0
		 */
		openDelay?: number;
		/**
		 * The delay before the tooltip closes (in ms).
		 * @default 100
		 */
		closeDelay?: number;
		/**
		 * The positioning options for the tooltip.
		 * @default { placement: "bottom", strategy: "fixed" }
		 */
		positioning?: TooltipRootProps["positioning"];
		/**
		 * Whether the tooltip is interactive.
		 * @default false
		 */
		interactive?: boolean;
	}

	let {
		id,
		content,
		children,
		trigger,
		class: className,
		showArrow = false,
		variant = "default",
		openDelay = 0,
		closeDelay = 100,
		positioning = { placement: "bottom", strategy: "fixed" },
		interactive = false,
		closeOnPointerDown = true,
		...rest
	}: Props = $props();

	// When trigger is provided, children become the content
	const effectiveTrigger = $derived(trigger ?? children);
	const effectiveContent = $derived(
		content ?? (trigger ? children : undefined),
	);

	const styles = $derived(
		popoverContentStyles({
			variant,
			interactive,
			zIndex: 50,
			animation: "scale",
			fontWeight: "medium",
			padding: "tooltip",
		}),
	);
</script>

<ArkTooltip.Root
	id={id as string}
	{openDelay}
	{closeDelay}
	{positioning}
	{interactive}
	{closeOnPointerDown}
	{...rest}
>
	<ArkTooltip.Trigger>
		{#snippet asChild(props)}
			<span class="inline-block" {...props()}>
				{@render effectiveTrigger?.()}
			</span>
		{/snippet}
	</ArkTooltip.Trigger>
	<Portal>
		<ArkTooltip.Positioner class={styles.positioner()}>
			<ArkTooltip.Content class={styles.content()}>
				{#if showArrow}
					<ArkTooltip.Arrow class={styles.arrow()}>
						<ArkTooltip.ArrowTip class={styles.arrowTip()} />
					</ArkTooltip.Arrow>
				{/if}
				{#if typeof effectiveContent === "string"}
					{effectiveContent}
				{:else if effectiveContent}
					{@render effectiveContent()}
				{/if}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	</Portal>
</ArkTooltip.Root>
