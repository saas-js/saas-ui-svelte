<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const text = tv({
		base: "wrap-break-word antialiased",
		variants: {
			size: {
				xs: "text-xs leading-xs",
				sm: "text-sm leading-sm",
				md: "text-md leading-md",
				lg: "text-lg leading-lg",
				xl: "text-xl leading-xl",
				"2xl": "text-2xl leading-2xl",
				"3xl": "text-3xl leading-3xl tracking-tight",
				"4xl": "text-4xl leading-4xl tracking-tight",
				"5xl": "text-5xl leading-5xl tracking-tighter",
				"6xl": "text-6xl leading-6xl tracking-tighter",
				"7xl": "text-7xl leading-7xl tracking-tighter",
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
			truncate: {
				true: "truncate",
			},
			lineClamp: {
				"1": "line-clamp-1",
				"2": "line-clamp-2",
				"3": "line-clamp-3",
				"4": "line-clamp-4",
				"5": "line-clamp-5",
				"6": "line-clamp-6",
				none: "line-clamp-none",
			},
		},
		defaultVariants: {
			size: "sm",
			weight: "normal",
		},
	});

	export type TextVariants = VariantProps<typeof text>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
		/**
		 * The content to render.
		 */
		children?: Snippet;
		/**
		 * The HTML element to render.
		 * @default "p"
		 */
		as?: string;
		/**
		 * The size of the text.
		 * @default "sm"
		 */
		size?: TextVariants["size"];
		/**
		 * The font weight of the text.
		 * @default "normal"
		 */
		weight?: TextVariants["weight"];
		/**
		 * Whether to truncate the text with an ellipsis.
		 */
		truncate?: boolean;
		/**
		 * The number of lines to clamp the text to.
		 */
		lineClamp?: TextVariants["lineClamp"];
		/**
		 * Alias for `weight`.
		 */
		fontWeight?: TextVariants["weight"];
		/**
		 * Alias for `size`.
		 */
		textStyle?: TextVariants["size"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		as = "p",
		size,
		weight,
		truncate,
		lineClamp,
		fontWeight,
		textStyle,
		class: className,
		children,
		...rest
	}: Props = $props();

	// Resolve aliases
	const finalSize = $derived(textStyle || size);
	const finalWeight = $derived(fontWeight || weight);
</script>

<svelte:element
	this={as}
	class={text({
		size: finalSize,
		weight: finalWeight,
		truncate,
		lineClamp,
		class: className,
	})}
	{...rest}
>
	{@render children?.()}
</svelte:element>
