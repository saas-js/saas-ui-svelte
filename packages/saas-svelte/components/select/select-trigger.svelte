<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type { SelectTriggerProps } from "@ark-ui/svelte/select";
	import { getContext, type Snippet } from "svelte";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
	import CaretDown from "phosphor-svelte/lib/CaretDown";
	import X from "phosphor-svelte/lib/X";

	interface Props extends SelectTriggerProps {
		/**
		 * The trigger content. If not provided, renders value and indicator.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to show a clear button when a value is selected.
		 * @default false
		 */
		clearable?: boolean;
	}

	let {
		children,
		class: className,
		clearable = false,
		...rest
	}: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
</script>

<Select.Control class={ctx?.styles?.control()}>
	<Select.Trigger
		class={ctx?.styles?.trigger({ class: className })}
		style={ctx?.colourStyle}
		{...rest}
	>
		{#if children}
			{@render children()}
		{:else}
			<Select.ValueText
				class={ctx?.styles?.valueText()}
				placeholder="Select an option"
			/>
		{/if}
	</Select.Trigger>
	<div
		class="pointer-events-none items-center gap-x-1 flex absolute right-0 inset-y-0 px-2.5"
	>
		{#if clearable}
			<Select.ClearTrigger class={ctx?.styles?.clearTrigger()}>
				<X class="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
			</Select.ClearTrigger>
		{/if}
		<Select.Indicator class={ctx?.styles?.indicator()}>
			<CaretDown weight="bold" aria-hidden="true" />
		</Select.Indicator>
	</div>
</Select.Control>
