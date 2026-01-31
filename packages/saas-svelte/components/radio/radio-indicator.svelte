<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { RADIO_GROUP_CTX, type RadioGroupContext } from "./radio-group.svelte";
import { Box } from "$saas/layout/box";

interface Props {
	/**
	 * Optional custom content for the indicator.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply to the indicator.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<RadioGroupContext>(RADIO_GROUP_CTX);
const styles = $derived(ctx.styles);
const variant = $derived(ctx.variant);

/**
 * Returns the indicator scale class based on variant.
 * Outline uses larger scale (0.6), others use 0.4.
 */
function getIndicatorScale() {
	return variant === "outline" ? "scale-[0.6]" : "scale-[0.4]";
}
</script>

<Box
	as="span"
	class={twMerge(
		styles.indicator(),
		getIndicatorScale(),
		"hidden group-data-[state=checked]/control:block",
		className,
	)}
	aria-hidden="true"
	{...restProps}
>
	{@render children?.()}
</Box>
