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
		 * Column definitions.
		 */
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();

	const ctx = getTableContext();
</script>

<colgroup class={twMerge(ctx?.styles.columnGroup(), className)}>
	{@render children?.()}
</colgroup>
