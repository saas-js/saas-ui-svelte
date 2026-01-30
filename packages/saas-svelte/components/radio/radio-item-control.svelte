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
const variant = $derived(ctx.variant);
const colourVars = $derived(getColourStyle(ctx.colour));

/**
 * Returns the control styling classes based on variant.
 * Checked state is handled via data-state attribute.
 */
function getControlClasses() {
	const base = styles.control();

	if (variant === "solid") {
		return twMerge(
			base,
			"text-white border-border-emphasized",
			"data-[state=checked]:bg-(--c-solid) data-[state=checked]:border-(--c-solid)",
		);
	}

	if (variant === "subtle") {
		return twMerge(
			base,
			"text-transparent border-border-emphasized",
			"data-[state=checked]:bg-(--c-subtle) data-[state=checked]:border-(--c-subtle) data-[state=checked]:text-(--c-fg)",
		);
	}

	if (variant === "outline") {
		return twMerge(
			base,
			"text-white border-border-emphasized",
			"data-[state=checked]:border-(--c-solid) data-[state=checked]:text-(--c-fg)",
		);
	}

	return base;
}
</script>

<RadioGroup.ItemControl
	class={twMerge(
		"group/control",
		getControlClasses(),
		"focus:outline-1 focus:outline-offset-2 focus:outline-(--c-focus-ring) focus:outline-solid",
		className,
	)}
	style={colourVars}
	{...restProps}
>
	{@render children?.()}
</RadioGroup.ItemControl>
