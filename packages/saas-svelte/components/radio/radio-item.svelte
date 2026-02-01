<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { RADIO_GROUP_CTX, type RadioGroupContext } from "./radio-group.svelte";
import { getColourStyle } from "$saas/utils/colours";
import { Box } from "$saas/layout/box";

interface Props {
	/**
	 * Content to render inside the radio item (composition API).
	 */
	children?: Snippet;
	/**
	 * The label text displayed next to the radio.
	 */
	label?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The value of this radio item.
	 */
	value: string;
	/**
	 * Whether this radio item is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether this radio item is invalid.
	 * @default false
	 */
	invalid?: boolean;
	[key: string]: any;
}

let {
	children,
	label,
	class: className,
	value,
	disabled = false,
	invalid = false,
	...restProps
}: Props = $props();

const ctx = getContext<RadioGroupContext>(RADIO_GROUP_CTX);
const styles = $derived(ctx.styles);
const variant = $derived(ctx.variant);
const colourVars = $derived(getColourStyle(ctx.colour));

const isDisabled = $derived(disabled || ctx.disabled);

/**
 * Returns the indicator scale class based on variant.
 * Outline uses larger scale (0.6), others use 0.4.
 */
function getIndicatorScale() {
	return variant === "outline" ? "scale-[0.6]" : "scale-[0.4]";
}
</script>

<RadioGroup.Item
	value={value}
	disabled={isDisabled}
	class={twMerge(
		styles.item(),
		isDisabled && "cursor-not-allowed",
		className,
	)}
	style={colourVars}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<RadioGroup.ItemControl class="group/control {styles.control()}">
			<Box
				as="span"
				class={twMerge(
					styles.indicator(),
					getIndicatorScale(),
					"hidden group-data-[state=checked]/control:block",
				)}
				aria-hidden="true"
			></Box>
		</RadioGroup.ItemControl>
		{#if label}
			<RadioGroup.ItemText class={styles.label()}>
				{label}
			</RadioGroup.ItemText>
		{/if}
		<RadioGroup.ItemHiddenInput />
	{/if}
</RadioGroup.Item>
