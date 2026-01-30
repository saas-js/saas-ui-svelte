<script lang="ts">
import { twMerge } from "tailwind-merge";
import { getTableContext } from "./table.svelte";

interface Props {
	/**
	 * Width of the column (use htmlWidth for HTML table columns).
	 */
	htmlWidth?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { htmlWidth, class: className }: Props = $props();

const ctx = getTableContext();
</script>

<col
	class={twMerge(ctx?.styles.column(), className)}
	width={htmlWidth || undefined}
/>
