<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type { SelectItemProps } from "@ark-ui/svelte/select";
	import { getContext, type Snippet } from "svelte";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";
	import Check from "phosphor-svelte/lib/Check";

	interface Props extends SelectItemProps {
		/**
		 * The select item content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to show the check indicator when selected.
		 * @default true
		 */
		showIndicator?: boolean;
	}

	let {
		children,
		class: className,
		showIndicator = true,
		...rest
	}: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
</script>

<Select.Item
	class={ctx?.styles?.item({ class: className })}
	style={`${ctx?.colourStyle || ""}${rest.style ? `; ${rest.style}` : ""}`}
	{...rest}
>
	{@render children()}
	{#if showIndicator}
		<Select.ItemIndicator class={ctx?.styles?.itemIndicator()}>
			<Check weight="bold" aria-hidden="true" />
		</Select.ItemIndicator>
	{/if}
</Select.Item>
