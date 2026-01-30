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
	 * Body content.
	 */
	children?: Snippet;
}

let { class: className, children }: Props = $props();

const ctx = getTableContext();
</script>

<tbody class={twMerge(ctx?.styles.body(), className)}>
	{@render children?.()}
</tbody>
