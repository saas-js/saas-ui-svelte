<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Shared popover content styles for Tooltip, ToggleTip, and similar components
 */
export const popoverContentStyles = tv({
	slots: {
		positioner: ["absolute", "isolate", "min-w-max"],
		content: [
			"flex",
			"flex-col",
			"relative",
			"rounded-sm",
			"data-[side=bottom]:origin-top",
			"data-[side=left]:origin-right",
			"data-[side=right]:origin-left",
			"data-[side=top]:origin-bottom",
			// Default: inverted (dark) appearance
			"bg-bg-inverted",
			"text-fg-inverted",
			"text-xs",
			"font-normal",
			"leading-xs",
			"antialiased",
			"max-w-80",
			"border-0",
			// Shadow
			"shadow-[0_4px_8px_rgba(24,24,27,0.1),0_0_1px_rgba(24,24,27,0.3)]",
			"outline-none",
		],
		arrow: [
			"[--arrow-size:var(--spacing-2)]",
			"[--arrow-background:var(--color-bg-inverted)]",
		],
		arrowTip: ["border-l", "border-t", "border-bg-inverted"],
	},
	variants: {
		variant: {
			default: {},
			inverted: {
				content: ["bg-bg-panel", "text-fg-default", "shadow-md", "border", "border-border-default"],
				arrow: ["[--arrow-background:var(--color-bg-panel)]"],
				arrowTip: ["border-border-default"],
			},
		},
		interactive: {
			true: {
				content: "pointer-events-auto",
			},
			false: {
				content: "pointer-events-none",
			},
		},
		zIndex: {
			10: {
				positioner: "z-dropdown",
			},
			50: {
				positioner: "z-popover",
			},
		},
		animation: {
			scale: {
				content:
					"data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
			},
			zoom: {
				content:
					"data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
			},
		},
		fontWeight: {
			normal: {
				content: "font-normal",
			},
			medium: {
				content: "font-medium",
			},
		},
		padding: {
			sm: {
				content: "px-2 py-1",
			},
			md: {
				content: "px-2.5 py-1",
			},
			tooltip: {
				content: "px-2.5 py-1",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		interactive: false,
		zIndex: 50,
		animation: "scale",
		fontWeight: "normal",
		padding: "sm",
	},
});

export type PopoverContentVariants = VariantProps<typeof popoverContentStyles>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	/**
	 * Content to display in the popover.
	 */
	content?: string | Snippet;
	/**
	 * Additional CSS classes for the content.
	 */
	class?: string;
	/**
	 * Additional CSS classes for the positioner.
	 */
	positionerClass?: string;
	/**
	 * Whether the content is interactive (can receive pointer events).
	 * @default false
	 */
	interactive?: PopoverContentVariants["interactive"];
	/**
	 * Z-index level for the popover.
	 * @default 50
	 */
	zIndex?: PopoverContentVariants["zIndex"];
	/**
	 * Animation style.
	 * @default "scale"
	 */
	animation?: PopoverContentVariants["animation"];
	/**
	 * Font weight.
	 * @default "normal"
	 */
	fontWeight?: PopoverContentVariants["fontWeight"];
	/**
	 * Padding size.
	 * @default "sm"
	 */
	padding?: PopoverContentVariants["padding"];
	/**
	 * Arrow snippet for rendering arrow.
	 */
	arrow?: Snippet;
	/**
	 * Slot for children content.
	 */
	children?: Snippet;
}

let {
	content,
	class: className,
	positionerClass,
	interactive = false,
	zIndex = 50,
	animation = "scale",
	fontWeight = "normal",
	padding = "sm",
	arrow,
	children,
}: Props = $props();

const styles = $derived(
	popoverContentStyles({
		interactive,
		zIndex,
		animation,
		fontWeight,
		padding,
	}),
);
</script>

<div class={styles.positioner({ class: positionerClass })}>
	<div class={styles.content({ class: className })}>
		{#if arrow}
			{@render arrow()}
		{/if}
		{#if typeof content === "string"}
			{content}
		{:else if content}
			{@render content()}
		{:else if children}
			{@render children()}
		{/if}
	</div>
</div>
