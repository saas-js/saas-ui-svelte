<script module lang="ts">
import { tv } from "tailwind-variants";

export const radioCardItem = tv({
	base: "group data-[state=checked]:z-1 data-[state=checked]:shadow-[inset_0_0_0_2px_var(--c-solid)]",
	variants: {
		disabled: {
			true: "cursor-not-allowed",
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
	},
});
</script>

<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import { getContext, type Snippet, type Component } from "svelte";
import { twMerge } from "tailwind-merge";
import {
	RADIO_CARD_CTX,
	type RadioCardContext,
} from "./radio-card-root.svelte";
import { getColourStyle } from "$saas/utils/colours";
import { Icon } from "$saas/components/icon";
import { Box } from "$saas/layout/box";
import { Stack } from "$saas/layout/stack";

interface Props {
	/**
	 * Content to render inside the radio card item (composition API).
	 */
	children?: Snippet;
	/**
	 * The label/title text displayed in the card.
	 */
	label?: string;
	/**
	 * The description text displayed below the label.
	 */
	description?: string;
	/**
	 * Icon component to display above the label. Auto-sized based on card size.
	 */
	icon?: Component<any>;
	/**
	 * Addon content displayed at the bottom of the card.
	 */
	addon?: string | Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The value of this radio card item.
	 */
	value: string;
	/**
	 * Whether this radio card item is disabled.
	 * @default false
	 */
	disabled?: boolean;
	[key: string]: any;
}

let {
	children,
	label,
	description,
	icon,
	addon,
	class: className,
	value,
	disabled = false,
	...restProps
}: Props = $props();

const ctx = getContext<RadioCardContext>(RADIO_CARD_CTX);
const styles = $derived(ctx.styles);
const colourVars = $derived(getColourStyle(ctx.colour));

const isDisabled = $derived(disabled || ctx.disabled);

// Map card size to icon size
const iconSizeMap = {
	sm: "md",
	md: "lg",
	lg: "xl",
} as const;
const iconSize = $derived(iconSizeMap[ctx.size ?? "md"]);

/**
 * Returns the control styling classes.
 * Uses solid variant styling.
 */
function getControlClasses() {
	const base = styles.control();
	return twMerge(
		base,
		"text-white border-border-emphasized",
		"group-data-[state=checked]:bg-(--c-solid) group-data-[state=checked]:border-(--c-solid)",
	);
}
</script>

<RadioGroup.Item
	value={value}
	disabled={isDisabled}
	class={twMerge(
		styles.item(),
		radioCardItem({ disabled: isDisabled }),
		className,
	)}
	style={colourVars}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Box class={twMerge(styles.itemContent())}>
			<Stack gap={1} class={twMerge(styles.itemBody())}>
				{#if icon}
					<Box class={twMerge(styles.itemIcon())}>
						<Icon as={icon} size={iconSize} />
					</Box>
				{/if}
				{#if label}
					<RadioGroup.ItemText class={styles.itemLabel()}>
						{label}
					</RadioGroup.ItemText>
				{/if}
				{#if description}
					<Box class={twMerge(styles.itemDescription())}>
						{description}
					</Box>
				{/if}
			</Stack>
			<RadioGroup.ItemControl
				class={twMerge("group/control", getControlClasses())}
			>
				<Box
					as="span"
					class={twMerge(
						styles.indicator(),
						"hidden group-data-[state=checked]/control:block",
					)}
					aria-hidden="true"
				></Box>
			</RadioGroup.ItemControl>
		</Box>
		{#if addon}
			<Box class={twMerge(styles.addon())}>
				{#if typeof addon === "string"}
					{addon}
				{:else}
					{@render addon()}
				{/if}
			</Box>
		{/if}
		<RadioGroup.ItemHiddenInput />
	{/if}
</RadioGroup.Item>
