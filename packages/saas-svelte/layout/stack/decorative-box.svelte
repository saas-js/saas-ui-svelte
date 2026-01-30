<script lang="ts">
import { twMerge } from "tailwind-merge";
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The content to render inside the decorative box.
	 */
	children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={twMerge(
		"bg-bg-emphasized flex items-center justify-center",
		// Dot Pattern Effect
		"bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNicgaGVpZ2h0PSc2JyB2aWV3Qm94PScwIDAgNiA2JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxnIGZpbGw9JyM5QzkyQUMnIGZpbGwtb3BhY2l0eT0nMC4yJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J001IDBoMUwwIDZWNXpNNiA1djFINXonLz48L2c+PC9zdmc+)] bg-clip-padding",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
