<script lang="ts">
import { Checkbox } from "@ark-ui/svelte/checkbox";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { CHECKBOX_CTX, type CheckboxContext } from "./checkbox-root.svelte";
import { getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * The content of the control (usually indicators).
	 */
	children: Snippet;
	/**
	 * Additional classes to apply to the control.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<CheckboxContext>(CHECKBOX_CTX);
const styles = $derived(ctx.styles);
const colourVars = $derived(getColourStyle(ctx.colour));
</script>

<Checkbox.Control
	class={twMerge(styles.control(), className)}
	style={colourVars}
	{...restProps}
>
	{@render children()}
</Checkbox.Control>
