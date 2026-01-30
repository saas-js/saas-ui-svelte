<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The HTML element to render.
		 * @default "div"
		 */
		as?: keyof HTMLElementTagNameMap;
		/**
		 * The content to render inside the box.
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

	let { as = "div", children, ...restProps }: Props = $props();
</script>

<svelte:element this={as} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<slot />
	{/if}
</svelte:element>
