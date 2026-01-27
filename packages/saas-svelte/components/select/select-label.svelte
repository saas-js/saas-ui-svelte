<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type { SelectLabelProps } from "@ark-ui/svelte/select";
	import { getContext, type Snippet } from "svelte";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";

	interface Props extends SelectLabelProps {
		/**
		 * The label content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
</script>

<Select.Label class={ctx?.styles?.label({ class: className })} {...rest}>
	{@render children()}
</Select.Label>
