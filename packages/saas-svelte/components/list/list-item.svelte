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
		align: {
			start: "",
			center: "",
			end: "",
		},
	},
	compoundVariants: [
		{ variant: "plain", align: "start", class: "items-start" },
		{ variant: "plain", align: "center", class: "items-center" },
		{ variant: "plain", align: "end", class: "items-end" },
	],
	defaultVariants: {
		variant: "marker",
		align: "start",
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
	 * The content to render inside the list item (Svelte snippet or slot fallback for Astro).
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<ListContext>(LIST_CTX);
const variant = $derived(ctx?.variant ?? "marker");
const align = $derived(ctx?.align ?? "start");
</script>

<li class={twMerge(listItem({ variant, align }), className)} {...restProps}>
	{@render children?.()}
</li>
