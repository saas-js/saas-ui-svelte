<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { getTableContext } from "./table.svelte";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Row content.
		 */
		children?: Snippet;
		/**
		 * Any additional attributes.
		 */
		[key: string]: any;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const ctx = getTableContext();
</script>

<tr class={twMerge(ctx?.styles.row(), className)} {...restProps}>
	{@render children?.()}
</tr>
