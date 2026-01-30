<script lang="ts">
import { Checkbox } from "@ark-ui/svelte/checkbox";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { CHECKBOX_CTX, type CheckboxContext } from "./checkbox-root.svelte";

interface Props {
	/**
	 * The content of the label.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the label.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<CheckboxContext>(CHECKBOX_CTX);
const styles = $derived(ctx.styles);
</script>

<Checkbox.Label class={twMerge(styles.label(), className)} {...restProps}>
	{@render children()}
</Checkbox.Label>
