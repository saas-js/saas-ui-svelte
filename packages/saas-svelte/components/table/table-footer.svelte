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
	 * Footer content.
	 */
	children?: Snippet;
}

let { class: className, children }: Props = $props();

const ctx = getTableContext();
</script>

<tfoot class={twMerge(ctx?.styles.footer(), className)}>
	{@render children?.()}
</tfoot>
