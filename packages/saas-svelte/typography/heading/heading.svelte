<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const heading = tv({
	base: "wrap-break-word antialiased text-fg-default",
	variants: {
		size: {
			xs: "text-xs leading-xs tracking-normal font-semibold",
			sm: "text-sm leading-sm tracking-normal font-semibold",
			md: "text-md leading-md tracking-tight font-semibold",
			lg: "text-lg leading-lg tracking-tight font-semibold",
			xl: "text-xl leading-xl tracking-tight font-semibold",
			"2xl": "text-2xl leading-2xl tracking-tight font-semibold",
			"3xl": "text-3xl leading-3xl tracking-tight font-semibold",
			"4xl": "text-4xl leading-4xl tracking-tighter font-semibold",
			"5xl": "text-5xl leading-5xl tracking-tighter font-semibold",
			"6xl": "text-6xl leading-6xl tracking-tighter font-semibold",
			"7xl": "text-7xl leading-7xl tracking-tighter font-semibold",
		},
		weight: {
			thin: "font-thin",
			extralight: "font-extralight",
			light: "font-light",
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			extrabold: "font-extrabold",
			black: "font-black",
		},
	},
	defaultVariants: {
		size: "xl",
		weight: "semibold",
	},
});

export type HeadingVariants = VariantProps<typeof heading>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
	/**
	 * The HTML element to render.
	 * @default "h2"
	 */
	as?: string;
	/**
	 * The size of the heading.
	 * @default "xl"
	 */
	size?: HeadingVariants["size"];
	/**
	 * The font weight of the heading.
	 * @default "semibold"
	 */
	weight?: HeadingVariants["weight"];
	/**
	 * Alias for `weight`.
	 */
	fontWeight?: HeadingVariants["weight"];
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	as = "h2",
	size,
	weight,
	fontWeight,
	class: className,
	children,
	...rest
}: Props = $props();

const finalWeight = $derived(fontWeight || weight);
</script>

<svelte:element
	this={as}
	class={twMerge(heading({ size, weight: finalWeight }), className)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
