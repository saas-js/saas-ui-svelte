<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import Quotes from "phosphor-svelte/lib/Quotes";

	export const blockquote = tv({
		base: "relative flex flex-col items-start gap-2 px-5 antialiased",
		variants: {
			variant: {
				subtle: "border-l-4 border-l-(--c-muted)",
				solid: "border-l-4 border-l-(--c-solid)",
				plain: "",
			},
			justify: {
				start: "items-start",
				center: "items-center",
				end: "items-end",
			},
		},
		defaultVariants: {
			variant: "subtle",
			justify: "start",
		},
	});

	export type BlockquoteVariants = VariantProps<typeof blockquote>;
</script>

<script lang="ts">
	import type { Snippet, Component } from "svelte";
	import { Icon } from "$saas/components/icon";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The colour palette of the component.
		 * @default "neutral"
		 */
		colour?: ColourName;
		/**
		 * The alignment of the content.
		 * @default "start"
		 */
		justify?: BlockquoteVariants["justify"];
		/**
		 * The visual style of the blockquote.
		 * @default "subtle"
		 */
		variant?: BlockquoteVariants["variant"];
		/**
		 * The source of the quote.
		 * @default undefined
		 */
		cite?: string;
		/**
		 * Whether to show a dash before the citation.
		 * @default false
		 */
		showDash?: boolean;
		/**
		 * Whether to show the default quote icon.
		 * @default false
		 */
		showIcon?: boolean;
		/**
		 * Custom icon component. Auto-sized to match the default icon.
		 * @default undefined
		 */
		icon?: Component<any>;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The quote content to display.
		 */
		children?: Snippet;
	}

	let {
		colour = "neutral",
		justify = "start",
		variant = "subtle",
		cite,
		showDash = false,
		showIcon = false,
		icon,
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour));
	const finalClass = $derived(
		blockquote({ variant, justify, class: className }),
	);
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<figure class={finalClass} style={finalStyle} {...restProps}>
	{#if icon}
		<div
			class="justify-center items-center inline-flex absolute inset-y-[0.5rem_auto] inset-x-[0_auto] [translate:-50%_-50%]"
		>
			<Icon
				as={icon}
				size="md"
				class="fill-current text-(--c-solid) scale-[-1]"
				weight="fill"
			/>
		</div>
	{:else if showIcon}
		<div
			class="justify-center items-center inline-flex absolute inset-y-[0.5rem_auto] inset-x-[0_auto] [translate:-50%_-50%]"
		>
			<Quotes
				class="size-5 fill-current text-(--c-solid) scale-[-1]"
				color="currentColor"
				weight="fill"
				aria-hidden="true"
			/>
		</div>
	{/if}

	<blockquote>
		{@render children?.()}
	</blockquote>

	{#if cite}
		<figcaption class="text-sm leading-sm text-fg-muted">
			{#if showDash}<span class="me-1">—</span>{/if}<cite>{cite}</cite>
		</figcaption>
	{/if}
</figure>
