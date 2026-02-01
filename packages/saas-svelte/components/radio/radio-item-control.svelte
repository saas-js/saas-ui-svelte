<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { RADIO_GROUP_CTX, type RadioGroupContext } from "./radio-group.svelte";
import { getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * The content of the control (usually indicators).
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply to the control.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<RadioGroupContext>(RADIO_GROUP_CTX);
const styles = $derived(ctx.styles);
const colourVars = $derived(getColourStyle(ctx.colour));
</script>

<RadioGroup.ItemControl
	class={twMerge("group/control", styles.control(), className)}
	style={colourVars}
	{...restProps}
>
	{@render children?.()}
</RadioGroup.ItemControl>
