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
		/**
		 * Whether the checkbox is checked.
		 */
		checked?: boolean | "indeterminate";
		[key: string]: any;
	}

	let {
		children,
		class: className,
		checked = false,
		...restProps
	}: Props = $props();

	const ctx = getContext<CheckboxContext>(CHECKBOX_CTX);
	const styles = $derived(ctx.styles);
	const variant = $derived(ctx.variant);
	const colourVars = $derived(getColourStyle(ctx.colour));

	function getControlClasses(isChecked: boolean | "indeterminate") {
		const base = styles.control();
		const isActive = isChecked === true || isChecked === "indeterminate";

		if (variant === "solid") {
			if (isActive) {
				return twMerge(
					base,
					"text-white bg-(--c-solid) border-(--c-solid)",
				);
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		if (variant === "subtle") {
			if (isActive) {
				return twMerge(
					base,
					"bg-(--c-subtle) border-(--c-muted) text-(--c-fg)",
				);
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		if (variant === "outline") {
			if (isActive) {
				return twMerge(base, "border-(--c-solid) text-(--c-fg)");
			}
			return twMerge(base, "text-white border-border-emphasized");
		}

		return base;
	}
</script>

<Checkbox.Control
	class={twMerge(
		getControlClasses(checked),
		"group-has-data-focus:outline-offset-2 group-has-data-focus:outline-1 group-has-data-focus:outline-solid group-has-data-focus:outline-(--c-focus-ring)",
		className,
	)}
	style={colourVars}
	{...restProps}
>
	{@render children()}
</Checkbox.Control>
