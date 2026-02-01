<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

import type { ColourName } from "$saas/utils/colours";

export const button = tv({
	base: [
		"appearance-none select-none whitespace-nowrap align-middle cursor-pointer isolate antialiased",
		"outline-0 shrink-0 justify-center items-center",
		"font-medium inline-flex relative w-fit",
		"rounded",
		"transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,translate,transform] duration-200",
		"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-fg-muted",
		"disabled:opacity-50 disabled:cursor-not-allowed",
	],
	variants: {
		variant: {
			// GLASS: Contrast text with gradient overlay and glossy effect
			glass: [
				"overflow-x-clip overflow-y-clip",
				"text-(--c-contrast) bg-(--c-solid)",
				"shadow-[inset_0_1px_0_#fff3,0_2px_4px_#0000004d,inset_0_0_1px_var(--colors-gray-300)/5%]",
				"[text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",
				// Gradient overlay pseudo-element
				"after:content-[''] after:absolute after:inset-0 after:opacity-20 after:pointer-events-none",
				"after:bg-[linear-gradient(#fff_40%,#0003)]",
				"after:transition-opacity after:duration-200",
				"hover:after:bg-[linear-gradient(#fffc_40%,#0009)]",
			],

			// SOLID: Contrast text with solid background
			solid: [
				"shadow text-(--c-contrast) bg-(--c-solid)",
				"hover:bg-(--c-solid)/90",
			],

			// SUBTLE: Accent text with subtle background
			subtle: ["text-(--c-fg) bg-(--c-muted)", "hover:bg-(--c-subtle)"],

			// SURFACE: Accent text with border and subtle background
			surface: [
				"shadow-sm border text-(--c-fg) bg-(--c-muted)/20 border-(--c-border)/90",
				"hover:bg-(--c-muted) hover:border-(--c-border)",
			],

			// OUTLINE: Accent text with thin border
			outline: [
				"border-[0.5px] text-(--c-fg) border-(--c-border)",
				"hover:bg-(--c-muted)",
			],

			// GHOST: Accent text, background on hover
			ghost: ["text-(--c-fg)", "hover:bg-(--c-subtle)"],

			// PLAIN: Accent text only
			plain: ["text-(--c-fg)"],
		},
		size: {
			"2xs": "h-5 min-w-5 gap-y-0.5 gap-x-0.5 text-xs leading-4 px-1.5 [&_svg]:size-2",
			xs: "h-6 min-w-6 gap-y-1 gap-x-1 text-xs leading-4 px-2 [&_svg]:size-2",
			sm: "h-7 min-w-7 gap-y-2 gap-x-2 text-sm leading-5 px-2.5 [&_svg]:size-3",
			md: "h-8 min-w-8 gap-y-2 gap-x-2 text-sm leading-5 px-3 [&_svg]:size-3.5",
			lg: "h-10 min-w-10 gap-y-3 gap-x-3 text-sm leading-5 px-5 rounded-md [&_svg]:size-5",
			xl: "h-12 min-w-12 gap-y-3 gap-x-3 text-base leading-6 px-6 rounded-md [&_svg]:size-6",
		},
		icon: { true: "px-0" },
	},
	compoundVariants: [
		{
			size: "2xs",
			icon: true,
			class: "w-5 [&_svg]:size-2.5",
		},
		{
			size: "xs",
			icon: true,
			class: "w-6 [&_svg]:size-3",
		},
		{
			size: "sm",
			icon: true,
			class: "w-7 [&_svg]:size-3.5",
		},
		{
			size: "md",
			icon: true,
			class: "w-8 [&_svg]:size-3.5",
		},
		{
			size: "lg",
			icon: true,
			class: "w-10 [&_svg]:size-5",
		},
		{
			size: "xl",
			icon: true,
			class: "w-12 [&_svg]:size-6",
		},
	],
	defaultVariants: {
		variant: "surface",
		size: "md",
		icon: false,
	},
});

export type ButtonVariants = VariantProps<typeof button>;
</script>

<script lang="ts">
import { getColourStyle } from "$saas/utils/colours";
import { Spinner } from "$saas/components/spinner";
import { Box } from "$saas/layout/box";
import { Centre } from "$saas/layout/centre";

type Props = {
	/**
	 * The element to render the button as.
	 * @default "button"
	 */
	as?: "button" | "a";
	/**
	 * The visual style of the button.
	 * @default "surface"
	 */
	variant?: ButtonVariants["variant"];
	/**
	 * The size of the button.
	 * @default "md"
	 */
	size?: ButtonVariants["size"];
	/**
	 * Whether the button is an icon-only button.
	 * @default false
	 */
	icon?: boolean;
	/**
	 * The colour palette of the button.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether the button is in a loading state.
	 * @default false
	 */
	loading?: boolean;
	/**
	 * Text to display when the button is loading.
	 * @default ""
	 */
	loadingText?: string;
	/**
	 * Whether the button is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The href for anchor buttons.
	 */
	href?: string;
	/**
	 * The target for anchor buttons.
	 */
	target?: string;
	/**
	 * The rel for anchor buttons.
	 */
	rel?: string;
	/**
	 * The button type attribute.
	 */
	type?: "button" | "submit" | "reset";
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Inline styles.
	 */
	style?: string;
	/**
	 * Children content.
	 */
	children?: Snippet;
	/**
	 * Additional attributes passed to the element.
	 */
	[key: string]: unknown;
};

let {
	as = "button",
	variant = "surface",
	size = "md",
	icon = false,
	colour = "gray",
	class: className,
	children,
	style,
	loading = false,
	loadingText = "",
	disabled,
	href,
	target,
	rel,
	type = "button",
	...restProps
}: Props = $props();

const colourStyle = $derived(getColourStyle(colour));
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

const finalClass = $derived(
	button({
		variant,
		size,
		icon,
		class: `${className || ""}${variant === "glass" ? " group" : ""}`,
	}),
);

// Original spinner sizes: xs=size-2.5, sm=size-3, md=size-3.5, lg=size-4, xl=size-5
const spinnerClassMap: Record<NonNullable<ButtonVariants["size"]>, string> = {
	"2xs": "size-2",
	xs: "size-2.5",
	sm: "size-3",
	md: "size-3.5",
	lg: "size-4",
	xl: "size-5",
};

const spinnerClass = $derived(spinnerClassMap[size]);
</script>

{#snippet buttonContent()}
	{#if loading && !loadingText}
		<Box as="span" class="contents">
			<Centre class="absolute inset-0" aria-hidden="true">
				<Spinner colour={colour} class={spinnerClass} />
			</Centre>
			<Box as="span" class="sr-only">
				{@render children?.()}
			</Box>
		</Box>
	{:else if loading && loadingText}
		<Box as="span" class="contents">
			<Spinner colour={colour} class={spinnerClass} />
			{loadingText}
		</Box>
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if as === "a"}
	<a
		class={finalClass}
		style={finalStyle}
		aria-disabled={disabled || loading || undefined}
		href={href}
		target={target}
		rel={rel}
		{...restProps}
	>
		{@render buttonContent()}
	</a>
{:else}
	<button
		class={finalClass}
		style={finalStyle}
		disabled={disabled || loading}
		type={type}
		{...restProps}
	>
		{@render buttonContent()}
	</button>
{/if}
