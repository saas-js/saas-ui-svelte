<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { ColourName } from "$saas/utils/colours";

export const TIMELINE_CTX = Symbol("TIMELINE_CTX");

export const timeline = tv({
	slots: {
		root: "flex-col w-full flex antialiased text-fg-default",
		item: "shrink-0 items-start gap-4 flex relative",
		connector: "shrink-0 relative flex items-center justify-center",
		content: "flex-col gap-2 w-full flex pb-6",
		title: "flex-wrap items-center gap-1.5 font-medium flex",
		description: "text-fg-muted flex items-center",
	},
	variants: {
		size: {
			sm: {
				connector:
					"size-4 text-xs [&_svg]:size-3.5 [&:has(img)]:rounded-full [&:has(img)]:overflow-hidden",
				content: "text-xs leading-4",
				title: "text-xs leading-4 min-h-4",
				description: "text-xs leading-4 min-h-4",
			},
			md: {
				connector:
					"size-5 text-sm [&_svg]:size-3.5 [&:has(img)]:rounded-full [&:has(img)]:overflow-hidden",
				content: "text-sm leading-5",
				title: "text-sm leading-5 min-h-5",
				description: "text-xs leading-4 min-h-5",
			},
			lg: {
				connector:
					"size-6 text-sm [&_svg]:size-5 [&:has(img)]:rounded-full [&:has(img)]:overflow-hidden",
				content: "text-sm leading-5",
				title: "text-sm leading-5 min-h-6",
				description: "text-xs leading-4 min-h-6",
			},
			xl: {
				connector:
					"size-8 text-base [&_svg]:size-6 [&:has(img)]:rounded-full [&:has(img)]:overflow-hidden",
				content: "text-sm leading-5",
				title: "text-sm leading-5 min-h-8",
				description: "text-sm leading-5 min-h-8",
			},
		},
		variant: {
			subtle: {
				connector: "text-fg-muted",
			},
			solid: {
				connector: "text-fg-default",
			},
			outline: {
				connector: "text-fg-muted",
			},
			plain: {
				connector: "text-fg-default",
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "solid",
	},
});

export type TimelineVariants = VariantProps<typeof timeline>;
export type { ColourName };

export interface TimelineContext {
	styles: ReturnType<typeof timeline>;
	size: NonNullable<TimelineVariants["size"]>;
	colour: ColourName;
}
</script>

<script lang="ts">
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * Content to render inside the timeline.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	/**
	 * The size of the timeline.
	 * @default "md"
	 */
	size?: TimelineVariants["size"];
	/**
	 * The visual style of the timeline.
	 * @default "solid"
	 */
	variant?: TimelineVariants["variant"];
	/**
	 * The colour palette of the timeline.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Inline styles to apply.
	 */
	style?: string;
	[key: string]: any;
}

let {
	children,
	class: className,
	size = "md",
	variant = "solid",
	colour = "gray",
	style,
	...restProps
}: Props = $props();

const classes = $derived(timeline({ size, variant }));
const colourStyle = $derived(getColourStyle(colour));
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

setContext<TimelineContext>(TIMELINE_CTX, {
	get styles() {
		return classes;
	},
	get size() {
		return size ?? "md";
	},
	get colour() {
		return colour ?? "gray";
	},
});
</script>

<div
	role="list"
	class={twMerge(classes.root(), className)}
	style={finalStyle}
	{...restProps}
>
	{@render children?.()}
</div>
