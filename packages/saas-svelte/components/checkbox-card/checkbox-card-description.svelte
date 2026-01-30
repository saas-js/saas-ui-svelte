<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { tv } from "tailwind-variants";

const checkboxCardDescription = tv({
	base: ["opacity-[0.64]", "text-sm", "leading-sm"],
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The description content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const finalClass = $derived(checkboxCardDescription({ class: className }));
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
