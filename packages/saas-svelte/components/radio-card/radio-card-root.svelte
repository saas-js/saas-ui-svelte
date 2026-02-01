<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const RADIO_CARD_CTX = Symbol("RADIO_CARD_CTX");

export const radioCard = tv({
	slots: {
		root: "isolate relative flex flex-col gap-y-1.5 gap-x-1.5 antialiased",
		label: "text-sm font-medium leading-5 inline-flex disabled:opacity-50",
		itemsContainer: "flex items-stretch gap-2",
		item: [
			"select-none",
			"flex-col",
			"flex-1",
			"text-sm",
			"leading-5",
			"flex",
			"relative",
			"rounded-md",
			"shadow-[inset_0_0_0_1px_var(--color-border-default)]",
			"disabled:opacity-80",
		],
		itemContent: [
			"flex-1",
			"inline-flex",
			"relative",
			"rounded-[inherit]",
			"disabled:bg-bg-subtle",
		],
		itemBody: "gap-1 flex-col flex-1 items-start flex",
		itemLabel: "font-medium",
		itemDescription: "opacity-64 text-sm leading-5",
		itemIcon: "text-fg-muted mb-2",
		control: [
			"shrink-0",
			"justify-center",
			"items-center",
			"inline-flex",
			"rounded-full",
			"border",
		],
		indicator: "bg-current size-full rounded-full scale-[0.4]",
		addon: "px-4 py-2 rounded-b-[inherit] border-t border-border-default disabled:text-fg-muted",
	},
	variants: {
		size: {
			sm: {
				itemContent: "p-3 gap-1.5",
				control: "size-3.5",
			},
			md: {
				itemContent: "p-4 gap-2.5",
				control: "size-4",
			},
			lg: {
				itemContent: "p-4 gap-3.5",
				control: "size-5",
			},
		},
		align: {
			start: {
				itemContent: "items-start",
				itemBody: "items-start",
			},
			center: {
				itemContent: "items-center flex-col text-center",
				itemBody: "items-center",
			},
			end: {
				itemContent: "items-end",
				itemBody: "items-end",
			},
		},
		orientation: {
			horizontal: {
				itemsContainer: "flex-row",
			},
			vertical: {
				itemsContainer: "flex-col",
			},
		},
		disabled: {
			true: {
				item: "opacity-50 cursor-not-allowed",
			},
		},
		invalid: {
			true: {
				item: "shadow-[inset_0_0_0_1px_var(--color-border-error)]",
			},
		},
	},
	defaultVariants: {
		size: "md",
		align: "start",
		orientation: "horizontal",
	},
});

export type RadioCardVariants = VariantProps<typeof radioCard>;

export interface RadioCardContext {
	styles: ReturnType<typeof radioCard>;
	colour: string;
	size: RadioCardVariants["size"];
	disabled: boolean;
}
</script>

<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * Content to render inside the radio card group.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The size of the radio cards.
	 * @default "md"
	 */
	size?: RadioCardVariants["size"];
	/**
	 * The alignment of content within cards.
	 * @default "start"
	 */
	align?: RadioCardVariants["align"];
	/**
	 * The colour palette of the radio cards.
	 * @default "indigo"
	 */
	colour?: ColourName;
	/**
	 * The controlled value of the radio card group.
	 */
	value?: string;
	/**
	 * The default value when uncontrolled.
	 */
	defaultValue?: string;
	/**
	 * The name of the input fields (used for form submission).
	 */
	name?: string;
	/**
	 * Layout orientation of the items container.
	 * @default "horizontal"
	 */
	orientation?: RadioCardVariants["orientation"];
	/**
	 * Whether the radio card group is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the radio card group is in an invalid state.
	 * @default false
	 */
	invalid?: boolean;
	/**
	 * Whether the radio card group is read-only.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Callback invoked when the value changes.
	 */
	onValueChange?: (details: { value: string }) => void;
	[key: string]: any;
}

let {
	children,
	class: className,
	size = "md",
	align = "start",
	colour = "indigo",
	value = $bindable(),
	defaultValue,
	name,
	orientation = "horizontal",
	disabled = false,
	invalid = false,
	readOnly = false,
	onValueChange,
	...restProps
}: Props = $props();

const classes = $derived(
	radioCard({ size, align, orientation, disabled, invalid }),
);
const colourVars = $derived(getColourStyle(colour));

setContext<RadioCardContext>(RADIO_CARD_CTX, {
	get styles() {
		return classes;
	},
	get colour() {
		return colour;
	},
	get size() {
		return size;
	},
	get disabled() {
		return disabled;
	},
});

function handleValueChange(details: { value: string | null }) {
	if (details.value !== null) {
		value = details.value;
		onValueChange?.({ value: details.value });
	}
}
</script>

<RadioGroup.Root
	value={value}
	defaultValue={defaultValue}
	name={name}
	orientation="vertical"
	disabled={disabled}
	readOnly={readOnly}
	onValueChange={handleValueChange}
	class={twMerge(classes.root(), className)}
	style={colourVars}
	{...restProps}
>
	{@render children?.()}
</RadioGroup.Root>
