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
const variant = $derived(ctx.variant);
const colourVars = $derived(getColourStyle(ctx.colour));

function getControlClasses() {
	const base = styles.control();
	const uncheckedStyles = "text-white border-border-emphasized";

	let checkedStyles = "";
	if (variant === "solid") {
		checkedStyles =
			"data-[state=checked]:text-white data-[state=checked]:bg-(--c-solid) data-[state=checked]:border-(--c-solid) data-[state=indeterminate]:text-white data-[state=indeterminate]:bg-(--c-solid) data-[state=indeterminate]:border-(--c-solid)";
	} else if (variant === "subtle") {
		checkedStyles =
			"data-[state=checked]:bg-(--c-subtle) data-[state=checked]:border-(--c-muted) data-[state=checked]:text-(--c-fg) data-[state=indeterminate]:bg-(--c-subtle) data-[state=indeterminate]:border-(--c-muted) data-[state=indeterminate]:text-(--c-fg)";
	} else if (variant === "outline") {
		checkedStyles =
			"data-[state=checked]:border-(--c-solid) data-[state=checked]:text-(--c-fg) data-[state=indeterminate]:border-(--c-solid) data-[state=indeterminate]:text-(--c-fg)";
	}

	return twMerge(base, uncheckedStyles, checkedStyles);
}
</script>

<Checkbox.Control
	class={twMerge(
		getControlClasses(),
		"group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-(--c-focus-ring) group-has-data-focus:outline-solid",
		className,
	)}
	style={colourVars}
	{...restProps}
>
	{@render children()}
</Checkbox.Control>
