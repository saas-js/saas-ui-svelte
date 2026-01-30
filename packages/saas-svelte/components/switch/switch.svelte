<script lang="ts">
import type { Snippet } from "svelte";
import { Switch } from "@ark-ui/svelte/switch";
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

const switchRecipe = tv({
	slots: {
		root: "items-center gap-2.5 inline-flex relative align-middle antialiased",
		control:
			"shrink-0 justify-start gap-2 inline-flex relative rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 bg-bg-emphasized focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring)",
		thumb: "shrink-0 justify-center items-center flex rounded-[inherit] transition-transform duration-150",
		label: "select-none font-medium leading-none",
	},
	variants: {
		size: {
			xs: {
				root: "[--switch-translate:0.75rem]",
				control: "w-6 h-3",
				thumb: "size-3",
				label: "text-xs",
			},
			sm: {
				root: "[--switch-translate:1rem]",
				control: "w-8 h-4",
				thumb: "size-4",
				label: "text-xs",
			},
			md: {
				root: "[--switch-translate:1.25rem]",
				control: "w-10 h-5",
				thumb: "size-5",
				label: "text-sm",
			},
			lg: {
				root: "[--switch-translate:1.5rem]",
				control: "w-12 h-6",
				thumb: "size-6",
				label: "text-sm",
			},
		},
		variant: {
			solid: {
				control: "data-[state=checked]:bg-(--c-solid)",
				thumb: "shadow scale-[0.8] bg-white",
			},
			raised: {
				control: "shadow-inner data-[state=checked]:bg-(--c-solid)/60",
				thumb: "shadow-sm relative bg-(--c-solid) focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring)",
			},
		},
		disabled: {
			true: {
				control: "opacity-50 cursor-not-allowed",
				label: "opacity-50",
			},
		},
	},
	compoundVariants: [
		{
			variant: "raised",
			size: "xs",
			class: { control: "h-1.5", thumb: "-top-0.75" },
		},
		{
			variant: "raised",
			size: "sm",
			class: { control: "h-2", thumb: "top-[-0.25rem]" },
		},
		{
			variant: "raised",
			size: "md",
			class: { control: "h-2.5", thumb: "-top-1.25" },
		},
		{
			variant: "raised",
			size: "lg",
			class: { control: "h-3", thumb: "top-[-0.375rem]" },
		},
	],
	defaultVariants: {
		size: "md",
		variant: "solid",
	},
});

type SwitchVariants = VariantProps<typeof switchRecipe>;

interface ThumbLabel {
	on?: Snippet;
	off?: Snippet;
}

interface TrackLabel {
	on?: Snippet;
	off?: Snippet;
}

interface Props {
	/**
	 * The label content of the switch.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The size of the switch.
	 * @default "md"
	 */
	size?: SwitchVariants["size"];
	/**
	 * The visual variant of the switch.
	 * @default "solid"
	 */
	variant?: SwitchVariants["variant"];
	/**
	 * The colour palette to use.
	 * @default "accent"
	 */
	colour?: ColourName;
	/**
	 * Whether the switch is checked.
	 */
	checked?: boolean;
	/**
	 * Whether the switch is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether the switch is invalid.
	 */
	invalid?: boolean;
	/**
	 * The name of the switch for form submission.
	 */
	name?: string;
	/**
	 * The value of the switch for form submission.
	 */
	value?: string;
	/**
	 * Callback when the checked state changes.
	 */
	onCheckedChange?: (details: { checked: boolean }) => void;
	/**
	 * Labels to display on the thumb based on state.
	 */
	thumbLabel?: ThumbLabel;
	/**
	 * Labels to display on the track based on state.
	 */
	trackLabel?: TrackLabel;
	[key: string]: any;
}

let {
	children,
	class: className,
	size = "md",
	variant = "solid",
	colour = "accent",
	checked = $bindable(false),
	disabled = false,
	invalid = false,
	name,
	value = "on",
	onCheckedChange,
	thumbLabel,
	trackLabel,
	...restProps
}: Props = $props();

const styles = $derived(switchRecipe({ size, variant, disabled }));
const colourStyle = $derived(getColourStyle(colour));

function handleCheckedChange(details: { checked: boolean }) {
	checked = details.checked;
	onCheckedChange?.(details);
}
</script>

<Switch.Root
	class={twMerge(styles.root(), className)}
	style={colourStyle}
	checked={checked}
	disabled={disabled}
	invalid={invalid}
	name={name}
	value={value}
	onCheckedChange={handleCheckedChange}
	{...restProps}
>
	<Switch.HiddenInput />
	<Switch.Control class={styles.control()}>
		<Switch.Thumb
			class={styles.thumb()}
			style="translate: {checked ? 'var(--switch-translate)' : '0'};"
		>
			{#if thumbLabel}
				{#if checked && thumbLabel.on}
					{@render thumbLabel.on()}
				{:else if !checked && thumbLabel.off}
					{@render thumbLabel.off()}
				{/if}
			{/if}
		</Switch.Thumb>
		{#if trackLabel}
			<span
				class="absolute grid size-(--switch-translate) shrink-0 content-center justify-center text-sm font-medium transition-transform duration-100 select-none will-change-transform"
				style="inset-inline-start: 2px; transform: translateX({checked ? '0' : 'calc(var(--switch-translate) - 4px)'});"
			>
				{#if checked && trackLabel.on}
					{@render trackLabel.on()}
				{:else if !checked && trackLabel.off}
					{@render trackLabel.off()}
				{/if}
			</span>
		{/if}
	</Switch.Control>
	{#if children}
		<Switch.Label class={styles.label()}>
			{@render children()}
		</Switch.Label>
	{/if}
</Switch.Root>
