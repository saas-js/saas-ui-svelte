<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { getTableContext } from "./table.svelte";

interface Props {
	/**
	 * Text alignment for the cell.
	 * @default "start"
	 */
	textAlign?: "start" | "center" | "end";
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Cell content.
	 */
	children?: Snippet;
	/**
	 * Any additional attributes.
	 */
	[key: string]: any;
}

let {
	textAlign = "start",
	class: className,
	children,
	...restProps
}: Props = $props();

const ctx = getTableContext();

const alignClass = $derived(
	textAlign === "center"
		? "text-center"
		: textAlign === "end"
			? "text-end"
			: "text-start",
);
</script>

<td class={twMerge(ctx?.styles.cell(), alignClass, className)} {...restProps}>
	{@render children?.()}
</td>
