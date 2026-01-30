<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const checkboxGroup = tv({
	base: "flex",
	variants: {
		orientation: {
			horizontal: "flex-row gap-y-6 gap-x-6",
			vertical: "flex-col gap-y-1.5 gap-x-1.5",
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroup>;
</script>

<script lang="ts">
import { Checkbox } from "@ark-ui/svelte/checkbox";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

interface Props {
	/**
	 * Content to render inside the group.
	 */
	children?: Snippet;
	/**
	 * The layout orientation of the group.
	 * @default "vertical"
	 */
	orientation?: CheckboxGroupVariants["orientation"];
	/**
	 * The label displayed above the group.
	 */
	label?: string;
	/**
	 * The controlled value of the checkbox group.
	 */
	value?: string[];
	/**
	 * The default value of the checkbox group when uncontrolled.
	 */
	defaultValue?: string[];
	/**
	 * The name of the input fields in the checkbox group (useful for form submission).
	 */
	name?: string;
	/**
	 * Whether the checkbox group is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether the checkbox group is read-only.
	 */
	readOnly?: boolean;
	/**
	 * Whether the checkbox group is invalid.
	 */
	invalid?: boolean;
	/**
	 * Callback invoked when the value changes.
	 */
	onValueChange?: (value: string[]) => void;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let {
	children,
	orientation = "vertical",
	label,
	value = $bindable([]),
	defaultValue,
	name,
	disabled,
	readOnly,
	invalid,
	onValueChange,
	class: className,
	...restProps
}: Props = $props();

const classes = $derived(checkboxGroup({ orientation }));

function handleValueChange(newValue: string[]) {
	value = newValue;
	onValueChange?.(newValue);
}
</script>

<Checkbox.Group
	value={value}
	defaultValue={defaultValue}
	name={name}
	disabled={disabled}
	readOnly={readOnly}
	invalid={invalid}
	onValueChange={handleValueChange}
	class={twMerge(classes, className)}
	{...restProps}
>
	{#if label}
		<span class="mb-2 text-sm leading-5 font-medium">
			{label}
		</span>
	{/if}
	{@render children?.()}
</Checkbox.Group>
