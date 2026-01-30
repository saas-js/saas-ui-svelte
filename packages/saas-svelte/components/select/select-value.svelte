<script lang="ts">
import { Select, useSelectContext } from "@ark-ui/svelte/select";
import type { SelectValueTextProps } from "@ark-ui/svelte/select";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
import { HStack } from "$saas/layout/stack";

interface Props extends Omit<SelectValueTextProps, "prefix" | "children"> {
	/**
	 * Custom render snippet for the selected value.
	 * Receives the selected items array.
	 */
	children?: Snippet<[items: any[]]>;
	/**
	 * Prefix snippet rendered before the value text.
	 * Receives the selected items array.
	 */
	prefix?: Snippet<[items: any[]]>;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Placeholder text when no value is selected.
	 * @default "Select an option"
	 */
	placeholder?: string;
	/**
	 * Property key to get the display value from the selected item.
	 * If not set, uses the default item string representation.
	 */
	valueKey?: string;
}

let {
	children: outerChildren,
	prefix,
	class: className,
	placeholder = "Select an option",
	valueKey,
	...rest
}: Props = $props();

const ctx = getContext<SelectContext>(SELECT_CTX);
const selectApi = useSelectContext();

const selectedItems = $derived(selectApi().selectedItems);
const firstItem = $derived(selectedItems?.[0]);
const displayValue = $derived(
	valueKey && firstItem ? firstItem[valueKey] : undefined,
);
</script>

{#if outerChildren}
	<Select.ValueText
		class={twMerge(ctx?.styles?.valueText() ?? "", className as string)}
		placeholder={placeholder}
		{...rest}
	>
		{@render outerChildren(selectedItems)}
	</Select.ValueText>
{:else if prefix || displayValue}
	<Select.ValueText
		class={twMerge(ctx?.styles?.valueText() ?? "", className as string)}
		placeholder={placeholder}
		{...rest}
	>
		{#if firstItem}
			<HStack gap={2}>
				{#if prefix}
					{@render prefix(selectedItems)}
				{/if}
				{displayValue || firstItem.name || firstItem.label || ""}
			</HStack>
		{/if}
	</Select.ValueText>
{:else}
	<Select.ValueText
		class={twMerge(ctx?.styles?.valueText() ?? "", className as string)}
		placeholder={placeholder}
		{...rest}
	/>
{/if}
