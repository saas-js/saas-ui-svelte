<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const navbarItemGroup = tv({
		base: "flex items-center",
		variants: {
			justify: {
				start: "justify-start",
				end: "justify-end",
				center: "justify-center",
				between: "justify-between",
			},
		},
		defaultVariants: {
			justify: "start",
		},
	});

	export type NavbarItemGroupVariants = VariantProps<typeof navbarItemGroup>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { NAVBAR_CTX, type NavbarContext } from "./navbar-root.svelte";

	interface Props extends HTMLAttributes<HTMLUListElement> {
		/** Gap between items using Tailwind gap classes. */
		gap?: number | string;
		/** Justify content alignment. @default "start" */
		justify?: NavbarItemGroupVariants["justify"];
		/** Content to render inside the item group. */
		children?: Snippet;
		/** Additional CSS classes to apply. */
		class?: string;
	}

	let {
		gap,
		justify = "start",
		children,
		class: className,
		...rest
	}: Props = $props();

	const ctx = getContext<NavbarContext>(NAVBAR_CTX);
	const gapClass = $derived(gap !== undefined ? `gap-${gap}` : undefined);
	const finalClass = $derived(
		twMerge(
			ctx?.styles?.itemGroup() ?? "",
			navbarItemGroup({ justify }),
			gapClass,
			className,
		),
	);
</script>

<ul class={finalClass} {...rest}>
	{@render children?.()}
</ul>
