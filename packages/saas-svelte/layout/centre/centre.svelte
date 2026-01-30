<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Whether to use inline-flex instead of flex.
		 * @default false
		 */
		inline?: boolean;
		/**
		 * The content to render inside the center container.
		 */
		children?: Snippet | unknown[] | unknown;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Additional HTML attributes to spread onto the element.
		 */
		[key: string]: unknown;
	}

	let { inline = false, children, class: className, ...restProps }: Props =
		$props();
</script>

<div
	class={twMerge(
		inline ? "inline-flex" : "flex",
		"items-center justify-center",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<slot />
	{/if}
</div>
