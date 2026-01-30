<script lang="ts">
import { Select } from "@ark-ui/svelte/select";
import type { SelectClearTriggerProps } from "@ark-ui/svelte/select";
import { getContext, type Snippet } from "svelte";
import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
import XIcon from "phosphor-svelte/lib/XIcon";

interface Props extends SelectClearTriggerProps {
	/**
	 * Custom icon or content for the clear trigger.
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

<Select.ClearTrigger
	class={ctx?.styles?.clearTrigger({ class: className })}
	aria-label="Clear value"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<XIcon class="size-3.5" weight="bold" aria-hidden="true" />
	{/if}
</Select.ClearTrigger>
