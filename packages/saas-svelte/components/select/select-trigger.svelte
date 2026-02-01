<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type { SelectTriggerProps } from "@ark-ui/svelte/select";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import { Flex } from "$saas/layout/flex";

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

<Select.Control class={ctx?.styles?.control() ?? ""}>
	<Select.Trigger
		class={twMerge(ctx?.styles?.trigger() ?? "", className as string)}
		style={ctx?.colourStyle}
		{...rest}
	>
		{#if children}
			{@render children()}
		{:else}
			<Select.ValueText
				class={ctx?.styles?.valueText() ?? ""}
				placeholder="Select an option"
			/>
		{/if}
	</Select.Trigger>
	<Flex
		align="center"
		gap={1}
		class={twMerge("pointer-events-none absolute inset-y-0 right-0 px-2.5")}
	>
		{#if clearable}
			<Select.ClearTrigger class={ctx?.styles?.clearTrigger() ?? ""}>
				<XIcon class="size-3.5" weight="bold" aria-hidden="true" />
			</Select.ClearTrigger>
		{/if}
		<Select.Indicator class={ctx?.styles?.indicator() ?? ""}>
			<CaretDownIcon weight="bold" aria-hidden="true" />
		</Select.Indicator>
	</Flex>
</Select.Control>
