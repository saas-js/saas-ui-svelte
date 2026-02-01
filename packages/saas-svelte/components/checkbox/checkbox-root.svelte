<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const CHECKBOX_CTX = Symbol("CHECKBOX_CTX");

	export const checkbox = tv({
		slots: {
			root: "align-top items-center gap-x-2.5 inline-flex relative group antialiased",
			control: [
				"shrink-0",
				"justify-center",
				"items-center",
				"inline-flex",
				"p-0.5",
				"rounded",
				"border",
				"text-white",
			],
			label: "select-none font-medium leading-5",
			indicator: "flex items-center justify-center",
		},
		variants: {
			size: {
				sm: {
					control: "size-3.5",
					label: "text-sm",
					indicator: "size-2.5",
				},
				md: {
					control: "size-4",
					label: "text-sm",
					indicator: "size-3",
				},
				lg: {
					control: "size-5",
					label: "text-sm",
					indicator: "size-3.5",
				},
			},
			variant: {
				solid: {},
				subtle: {},
				outline: {},
			},
			disabled: {
				true: {
					root: "opacity-50 cursor-not-allowed",
				},
			},
			invalid: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Valid states (invalid: false) - use colour-based styles with colour focus ring
			{
				variant: "solid",
				invalid: false,
				class: {
					control:
						"border-border-emphasized group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-(--c-focus-ring) group-has-data-focus:outline-solid data-[state=checked]:text-white data-[state=checked]:bg-(--c-solid) data-[state=checked]:border-(--c-solid) data-[state=indeterminate]:text-white data-[state=indeterminate]:bg-(--c-solid) data-[state=indeterminate]:border-(--c-solid)",
				},
			},
			{
				variant: "subtle",
				invalid: false,
				class: {
					control:
						"border-border-emphasized group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-(--c-focus-ring) group-has-data-focus:outline-solid data-[state=checked]:bg-(--c-subtle) data-[state=checked]:border-(--c-muted) data-[state=checked]:text-(--c-fg) data-[state=indeterminate]:bg-(--c-subtle) data-[state=indeterminate]:border-(--c-muted) data-[state=indeterminate]:text-(--c-fg)",
				},
			},
			{
				variant: "outline",
				invalid: false,
				class: {
					control:
						"border-border-emphasized group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-(--c-focus-ring) group-has-data-focus:outline-solid data-[state=checked]:border-(--c-solid) data-[state=checked]:text-(--c-fg) data-[state=indeterminate]:border-(--c-solid) data-[state=indeterminate]:text-(--c-fg)",
				},
			},
			// Invalid states (invalid: true) - use error styles with error focus ring
			{
				variant: "solid",
				invalid: true,
				class: {
					control:
						"border-border-error group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-border-error group-has-data-focus:outline-solid data-[state=checked]:bg-border-error data-[state=checked]:border-border-error data-[state=checked]:text-fg-inverted data-[state=indeterminate]:bg-border-error data-[state=indeterminate]:border-border-error data-[state=indeterminate]:text-fg-inverted",
				},
			},
			{
				variant: "subtle",
				invalid: true,
				class: {
					control:
						"border-border-error group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-border-error group-has-data-focus:outline-solid data-[state=checked]:bg-border-error data-[state=checked]:border-border-error data-[state=checked]:text-fg-inverted data-[state=indeterminate]:bg-border-error data-[state=indeterminate]:border-border-error data-[state=indeterminate]:text-fg-inverted",
				},
			},
			{
				variant: "outline",
				invalid: true,
				class: {
					control:
						"border-border-error group-has-data-focus:outline-1 group-has-data-focus:outline-offset-2 group-has-data-focus:outline-border-error group-has-data-focus:outline-solid data-[state=checked]:bg-border-error data-[state=checked]:border-border-error data-[state=checked]:text-fg-inverted data-[state=indeterminate]:bg-border-error data-[state=indeterminate]:border-border-error data-[state=indeterminate]:text-fg-inverted",
				},
			},
		],
		defaultVariants: {
			size: "md",
			variant: "solid",
			invalid: false,
		},
	});

	export type CheckboxVariants = VariantProps<typeof checkbox>;

	export interface CheckboxContext {
		styles: ReturnType<typeof checkbox>;
		variant: CheckboxVariants["variant"];
		colour: string;
	}
</script>

<script lang="ts">
	import { Checkbox } from "@ark-ui/svelte/checkbox";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import MinusIcon from "phosphor-svelte/lib/MinusIcon";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { setContext, type Snippet, type Component } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Content to render inside the checkbox (composition API).
		 */
		children?: Snippet;
		/**
		 * The label text displayed next to the checkbox.
		 */
		label?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the checkbox.
		 * @default "md"
		 */
		size?: CheckboxVariants["size"];
		/**
		 * The visual style of the checkbox.
		 * @default "solid"
		 */
		variant?: CheckboxVariants["variant"];
		/**
		 * The colour palette of the checkbox.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * The controlled checked state of the checkbox.
		 * @default false
		 */
		checked?: boolean | "indeterminate";
		/**
		 * The default checked state when uncontrolled.
		 */
		defaultChecked?: boolean;
		/**
		 * The value of the checkbox (used in groups).
		 */
		value?: string;
		/**
		 * The name of the input field.
		 */
		name?: string;
		/**
		 * Whether the checkbox is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the checkbox is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the checkbox is required.
		 * @default false
		 */
		required?: boolean;
		/**
		 * Custom icon component to render when checked. Auto-sized to fill the checkbox.
		 */
		icon?: Component<any>;
		/**
		 * Callback invoked when the checked state changes.
		 */
		onCheckedChange?: (details: {
			checked: boolean | "indeterminate";
		}) => void;
		/**
		 * Additional props to spread onto the Ark Checkbox.Root component.
		 */
		[key: string]: any;
	}

	let {
		children,
		label,
		class: className,
		size = "md",
		variant = "solid",
		colour = "indigo",
		checked = $bindable(),
		defaultChecked,
		value,
		name,
		disabled = false,
		invalid = false,
		required = false,
		icon,
		onCheckedChange,
		...restProps
	}: Props = $props();

	const classes = $derived(checkbox({ size, variant, disabled, invalid }));
	const colourVars = $derived(getColourStyle(colour));

	setContext<CheckboxContext>(CHECKBOX_CTX, {
		get styles() {
			return classes;
		},
		get variant() {
			return variant;
		},
		get colour() {
			return colour;
		},
	});

	function handleCheckedChange(details: {
		checked: boolean | "indeterminate";
	}) {
		checked = details.checked;
		onCheckedChange?.(details);
	}

	// Only pass checked prop if explicitly set (not inside a group)
	const checkedProps = $derived(checked !== undefined ? { checked } : {});
</script>

<Checkbox.Root
	{...checkedProps}
	{defaultChecked}
	{value}
	{name}
	{disabled}
	{required}
	onCheckedChange={handleCheckedChange}
	class={twMerge(classes.root(), className)}
	style={colourVars}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Checkbox.Control class={classes.control()}>
			<Checkbox.Indicator class={classes.indicator()}>
				{#if icon}
					{@const Icon = icon}
					<Icon class="h-full w-full" weight="bold" />
				{:else}
					<CheckIcon class="h-full w-full" weight="bold" />
				{/if}
			</Checkbox.Indicator>
			<Checkbox.Indicator indeterminate class={classes.indicator()}>
				<MinusIcon class="h-full w-full" weight="bold" />
			</Checkbox.Indicator>
		</Checkbox.Control>
		{#if label}
			<Checkbox.Label class={classes.label()}>{label}</Checkbox.Label>
		{/if}
		<Checkbox.HiddenInput />
	{/if}
</Checkbox.Root>
