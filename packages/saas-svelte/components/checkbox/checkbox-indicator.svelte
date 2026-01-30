<script lang="ts">
import { Checkbox } from "@ark-ui/svelte/checkbox";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { CHECKBOX_CTX, type CheckboxContext } from "./checkbox-root.svelte";

interface Props {
	/**
	 * The content of the indicator (usually an icon).
	 */
	children: Snippet;
	/**
	 * Whether this indicator is for the indeterminate state.
	 */
	indeterminate?: boolean;
	/**
	 * Additional classes to apply to the indicator.
	 */
	class?: string;
	[key: string]: any;
}

let {
	children,
	indeterminate = false,
	class: className,
	...restProps
}: Props = $props();

const ctx = getContext<CheckboxContext>(CHECKBOX_CTX);
const styles = $derived(ctx.styles);
</script>

<Checkbox.Indicator
	indeterminate={indeterminate}
	class={twMerge(styles.indicator(), className)}
	{...restProps}
>
	{@render children()}
</Checkbox.Indicator>
