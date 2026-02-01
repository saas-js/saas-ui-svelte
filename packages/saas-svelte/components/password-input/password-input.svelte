<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	export const passwordInput = tv({
		slots: {
			root: [
				"relative",
				"inline-flex",
				"w-full",
				"isolate",
				"gap-2",
				"items-center",
				"justify-start",
				"antialiased",
			],
			input: [
				"appearance-none",
				"outline-0",
				"w-full",
				"relative",
				"rounded",
				"border",
				"antialiased",
				"disabled:opacity-50",
				"disabled:cursor-not-allowed",
				"focus-visible:outline-solid",
				"focus-visible:outline-(--c-focus-ring)",
				"focus-visible:border-(--c-focus-ring)",
				"border-border-default",
				"hover:border-border-emphasized",
				"hover:focus-visible:border-(--c-focus-ring)",
			],
			element: [
				"absolute",
				"end-0",
				"z-2",
				"flex",
				"h-full",
				"items-center",
				"justify-center",
				"text-fg-muted",
				"px-3",
			],
			button: [
				"appearance-none",
				"select-none",
				"whitespace-nowrap",
				"align-middle",
				"cursor-pointer",
				"isolate",
				"outline-0",
				"shrink-0",
				"justify-center",
				"items-center",
				"gap-2",
				"font-medium",
				"transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,translate,transform]",
				"duration-200",
				"flex",
				"relative",
				"rounded",
				"focus-visible:outline-offset-2",
				"focus-visible:outline-1",
				"focus-visible:outline-solid",
				"focus-visible:outline-fg-muted",
				"disabled:opacity-50",
				"disabled:cursor-not-allowed",
				"hover:bg-bg-subtle",
				"aspect-square",
				"-mr-2",
				"text-gray-fg",
			],
			icon: ["shrink-0", "block"],
		},
		variants: {
			size: {
				xs: {
					root: "h-6",
					input: "min-w-6 h-6 pl-2 pr-6 text-xs leading-xs",
					element: "text-xs",
					button: "h-[calc(100%-(var(--spacing-2)))] min-w-5",
					icon: "size-3",
				},
				sm: {
					root: "h-7",
					input: "min-w-7 h-7 pl-2.5 pr-7 text-sm leading-sm",
					element: "text-sm",
					button: "h-[calc(100%-(var(--spacing-2)))] min-w-6",
					icon: "size-3.5",
				},
				md: {
					root: "h-8",
					input: "min-w-8 h-8 pl-3 pr-8 text-sm leading-sm",
					element: "text-sm",
					button: "h-[calc(100%-(var(--spacing-2)))] min-w-7",
					icon: "size-4",
				},
				lg: {
					root: "h-10",
					input: "min-w-10 h-10 pl-5 pr-10 text-sm leading-sm rounded-md",
					element: "text-sm",
					button: "h-[calc(100%-(var(--spacing-2)))] min-w-8",
					icon: "size-4",
				},
			},
			invalid: {
				true: {
					input: [
						"border-border-error",
						"focus-visible:border-border-error",
						"focus-visible:outline-border-error",
					],
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type PasswordInputVariants = VariantProps<typeof passwordInput>;
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";
	import { twMerge } from "tailwind-merge";
	import { getContext } from "svelte";
	import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";
	import EyeIcon from "phosphor-svelte/lib/EyeIcon";
	import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
	import { Flex } from "$saas/layout/flex";

	interface Props extends Omit<
		HTMLInputAttributes,
		"size" | "class" | "type"
	> {
		/**
		 * The size of the password input.
		 * @default "md"
		 */
		size?: PasswordInputVariants["size"];
		/**
		 * The colour theme of the input.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the input is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the input is disabled.
		 */
		disabled?: boolean;
		/**
		 * Placeholder text for the input.
		 */
		placeholder?: string;
		/**
		 * The default visibility state of the password input.
		 * @default false
		 */
		defaultVisible?: boolean;
		/**
		 * The controlled visibility state of the password input.
		 */
		visible?: boolean;
		/**
		 * Callback invoked when the visibility state changes.
		 */
		onVisibleChange?: (visible: boolean) => void;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
		/**
		 * Additional CSS classes for the root container.
		 */
		rootClass?: ClassNameValue;
		/**
		 * Reference to the input element.
		 */
		ref?: HTMLInputElement | null;
	}

	let {
		size = "md",
		colour = "gray",
		class: className,
		rootClass,
		invalid = false,
		disabled = false,
		defaultVisible = false,
		visible = $bindable(),
		onVisibleChange,
		style,
		value = $bindable(),
		ref = $bindable(null),
		...restProps
	}: Props = $props();

	const fieldContext = getContext<FieldContext>(FIELD_CTX);

	const fieldState = $derived($fieldContext ?? {});

	const colourVars = $derived(getColourStyle(colour));

	const isInvalid = $derived(invalid || fieldState.invalid || false);
	const isDisabled = $derived(disabled || fieldState.disabled || false);
	const isRequired = $derived(
		restProps.required || fieldState.required || false,
	);
	const isReadOnly = $derived(
		restProps.readonly || fieldState.readOnly || false,
	);
	const id = $derived(restProps.id || fieldState.id);

	// Internal visibility state
	let internalVisible = $state(false);

	// Sync with defaultVisible prop on mount
	$effect(() => {
		if (defaultVisible) {
			internalVisible = defaultVisible;
		}
	});

	// Determine actual visibility (controlled vs uncontrolled)
	const isVisible = $derived(
		visible !== undefined ? visible : internalVisible,
	);

	function toggleVisibility() {
		const newVisible = !isVisible;
		if (visible !== undefined) {
			// Controlled mode - just call callback
			onVisibleChange?.(newVisible);
		} else {
			// Uncontrolled mode - update internal state
			internalVisible = newVisible;
			onVisibleChange?.(newVisible);
		}
	}

	const styles = $derived(
		passwordInput({
			size,
			invalid: isInvalid,
		}),
	);

	const inputStyles = $derived(
		[colourVars, style].filter(Boolean).join("; "),
	);
</script>

<Flex
	inline
	align="center"
	justify="start"
	class={twMerge(styles.root(), rootClass as string)}
>
	<input
		bind:this={ref}
		{id}
		type={isVisible ? "text" : "password"}
		disabled={isDisabled}
		required={isRequired}
		readonly={isReadOnly}
		class={twMerge(styles.input(), className as string)}
		style={inputStyles}
		bind:value
		{...restProps}
	/>
	<Flex align="center" justify="center" class={styles.element()}>
		<button
			type="button"
			tabindex={-1}
			aria-label="Toggle password visibility"
			class={styles.button()}
			onclick={toggleVisibility}
			disabled={isDisabled}
		>
			{#if isVisible}
				<EyeSlashIcon class={styles.icon()} aria-hidden="true" />
			{:else}
				<EyeIcon class={styles.icon()} aria-hidden="true" />
			{/if}
		</button>
	</Flex>
</Flex>
