<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STAT_CTX, type StatContext } from "./stat-root.svelte";

	interface Props {
		/**
		 * The content of the value (used when no value prop is provided).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The numeric value to display (will be formatted if formatOptions is provided).
		 */
		value?: number;
		/**
		 * Intl.NumberFormat options for formatting the value.
		 */
		formatOptions?: Intl.NumberFormatOptions;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		value,
		formatOptions,
		...restProps
	}: Props = $props();

	const ctx = getContext<StatContext>(STAT_CTX);
	const styles = $derived(ctx.styles);

	const formattedValue = $derived.by(() => {
		if (value !== undefined && formatOptions) {
			return new Intl.NumberFormat("en-US", formatOptions).format(value);
		}
		return value?.toString();
	});
</script>

<dd class={twMerge(styles.valueText(), className)} {...restProps}>
	{#if value !== undefined}
		{formattedValue}
	{/if}
	{@render children?.()}
</dd>
