<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes } from "svelte/elements";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import QuotesIcon from "phosphor-svelte/lib/QuotesIcon";

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
import { Centre } from "$saas/layout/centre";

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
const finalClass = $derived(blockquote({ variant, justify, class: className }));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<figure class={finalClass} style={finalStyle} {...restProps}>
	{#if icon}
		<Centre
			inline
			class="absolute inset-x-[0_auto] inset-y-[0.5rem_auto] [translate:-50%_-50%]"
		>
			<Icon
				as={icon}
				size="md"
				class="scale-[-1] fill-current text-(--c-solid)"
				weight="fill"
			/>
		</Centre>
	{:else if showIcon}
		<Centre
			inline
			class="absolute inset-x-[0_auto] inset-y-[0.5rem_auto] [translate:-50%_-50%]"
		>
			<QuotesIcon
				class="size-5 scale-[-1] fill-current text-(--c-solid)"
				color="currentColor"
				weight="fill"
				aria-hidden="true"
			/>
		</Centre>
	{/if}

	<blockquote>
		{@render children?.()}
	</blockquote>

	{#if cite}
		<figcaption class="leading-sm text-fg-muted text-sm">
			{#if showDash}<span class="me-1">—</span>{/if}<cite>{cite}</cite>
		</figcaption>
	{/if}
</figure>
