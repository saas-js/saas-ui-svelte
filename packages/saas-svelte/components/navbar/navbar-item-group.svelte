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
	justify?: "start" | "end" | "center" | "between";
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
const justifyClass = $derived({
	start: "justify-start",
	end: "justify-end",
	center: "justify-center",
	between: "justify-between",
}[justify]);
const finalClass = $derived(
	twMerge(
		ctx?.styles?.itemGroup() ?? "",
		"flex items-center",
		justifyClass,
		gapClass,
		className,
	),
);
</script>

<ul class={finalClass} {...rest}>
	{@render children?.()}
</ul>
