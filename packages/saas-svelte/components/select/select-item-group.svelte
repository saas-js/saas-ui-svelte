<script lang="ts">
import { Select } from "@ark-ui/svelte/select";
import type { SelectItemGroupProps } from "@ark-ui/svelte/select";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { SELECT_CTX, type SelectContext } from "./select-root.svelte";

interface Props extends SelectItemGroupProps {
	/**
	 * The group content (items).
	 */
	children: Snippet;
	/**
	 * The group label text.
	 */
	label?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, label, class: className, ...rest }: Props = $props();

const ctx = getContext<SelectContext>(SELECT_CTX);
</script>

<Select.ItemGroup
	class={twMerge(ctx?.styles?.itemGroup() ?? "", className as string)}
	{...rest}
>
	{#if label}
		<Select.ItemGroupLabel class={ctx?.styles?.itemGroupLabel() ?? ""}>
			{label}
		</Select.ItemGroupLabel>
	{/if}
	{@render children()}
</Select.ItemGroup>
