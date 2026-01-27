<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { getTableContext } from "./table.svelte";

	interface Props {
		/**
		 * Text alignment for the column.
		 * @default "start"
		 */
		textAlign?: "start" | "center" | "end";
		/**
		 * Minimum width of the column.
		 */
		minW?: string;
		/**
		 * Width of the column.
		 */
		w?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Header cell content.
		 */
		children?: Snippet;
		/**
		 * Any additional attributes.
		 */
		[key: string]: any;
	}

	let {
		textAlign = "start",
		minW,
		w,
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

	const style = $derived(
		[minW && `min-width: ${minW}`, w && `width: ${w}`]
			.filter(Boolean)
			.join("; "),
	);
</script>

<th
	class={twMerge(ctx?.styles.columnHeader(), alignClass, className)}
	style={style || undefined}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</th>
