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
		 * Header content.
		 */
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();

	const ctx = getTableContext();
</script>

<thead class={twMerge(ctx?.styles.header(), className)}>
	{@render children?.()}
</thead>
