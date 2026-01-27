<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type { SelectIndicatorProps } from "@ark-ui/svelte/select";
	import { getContext, type Snippet } from "svelte";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
	import CaretDown from "phosphor-svelte/lib/CaretDown";

	interface Props extends SelectIndicatorProps {
		/**
		 * Custom icon for the indicator.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
</script>

<Select.Indicator
	class={ctx?.styles?.indicator({ class: className })}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<CaretDown weight="bold" aria-hidden="true" />
	{/if}
</Select.Indicator>
