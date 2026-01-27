<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * Tailwind Variants styles for the List item component.
	 */
	export const listItem = tv({
		base: ["whitespace-normal", "antialiased"],
		variants: {
			variant: {
				marker: "",
				plain: "flex",
			},
		},
		defaultVariants: {
			variant: "marker",
		},
	});

	export type ListItemVariants = VariantProps<typeof listItem>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { LIST_CTX, type ListContext } from "./list-root.svelte";

	interface Props extends HTMLAttributes<HTMLLIElement> {
		/**
		 * The content to render inside the list item.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<ListContext>(LIST_CTX);
	const variant = $derived(ctx?.variant ?? "marker");
	const align = $derived(ctx?.align ?? "start");

	// For plain variant, apply alignment classes
	const alignmentClasses: Record<string, string> = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
	};
	const alignClass = $derived(
		variant === "plain" ? (alignmentClasses[align] ?? "items-start") : "",
	);

	const finalClass = $derived(
		twMerge(listItem({ variant }), alignClass, className),
	);
</script>

<li class={finalClass} {...restProps}>
	{@render children()}
</li>
