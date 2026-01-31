<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const SEGMENT_GROUP_CTX = Symbol("SEGMENT_GROUP_CTX");

/**
 * Tailwind Variants configuration for SegmentGroup component.
 * Provides consistent styling across all size and colour variants.
 */
export const segmentGroup = tv({
	slots: {
		root: [
			"antialiased",
			"isolate",
			"relative",
			"inline-flex",
			"min-w-max",
			"rounded-md",
			"border",
			"border-border-default",
			"bg-bg-muted",
			"shadow-inner",
		],
		item: [
			"select-none",
			"cursor-pointer",
			"relative",
			"flex",
			"items-center",
			"rounded-[inherit]",
			"transition-colors",
			"duration-moderate",
			"before:content-['']",
			"before:absolute",
			"before:w-px",
			"before:bg-border-default",
			"before:inset-y-0",
			"before:start-0",
			"before:transition-opacity",
			"before:duration-moderate",
			"first-of-type:before:opacity-0",
			"data-[state=checked]:text-(--c-fg)",
			"data-[state=unchecked]:text-fg-muted",
			"data-[state=unchecked]:hover:text-fg-default",
			"data-focus-visible:outline",
			"data-focus-visible:outline-1",
			"data-focus-visible:outline-offset-2",
			"data-focus-visible:outline-(--c-focus-ring)",
			"data-disabled:opacity-50",
			"data-disabled:cursor-not-allowed",
		],
		itemText: "",
		indicator: [
			"absolute",
			"z-[-1]",
			"-translate-x-px",
			"-translate-y-px",
			"bg-bg-default",
			"rounded-md",
			"shadow-sm",
			"ring-1",
			"ring-border-emphasized",
			"w-(--width)",
			"h-(--height)",
			"top-(--top)",
			"will-change-[left,top,width,height]",
			"transition-[left,top,width,height]",
			"duration-moderate",
		],
	},
	variants: {
		size: {
			xs: {
				root: "h-6 rounded",
				item: "gap-1 px-3 text-xs leading-4 rounded",
				indicator: "rounded",
			},
			sm: {
				root: "h-7 rounded",
				item: "gap-2 px-4 text-sm leading-5 rounded",
				indicator: "rounded",
			},
			md: {
				root: "h-8",
				item: "gap-2 px-4 text-sm leading-5",
				indicator: "",
			},
			lg: {
				root: "h-10",
				item: "gap-3 px-5 text-sm leading-5",
				indicator: "",
			},
		},
		disabled: {
			true: {
				root: "opacity-50 cursor-not-allowed",
				item: "cursor-not-allowed",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type SegmentGroupVariants = VariantProps<typeof segmentGroup>;

export interface SegmentGroupContext {
	styles: ReturnType<typeof segmentGroup>;
	colour: string;
	size: SegmentGroupVariants["size"];
	disabled: boolean;
	onPrefetch?: (value: string) => void;
}
</script>

<script lang="ts">
import { SegmentGroup } from "@ark-ui/svelte/segment-group";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * Content to render inside the segment group.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The size of the segment group.
	 * @default "md"
	 */
	size?: SegmentGroupVariants["size"];
	/**
	 * The colour palette of the segment group.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * The controlled value of the segment group.
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
	 * Layout orientation of the segment group.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Whether the segment group is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the segment group is read-only.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Callback invoked when the value changes.
	 */
	onValueChange?: (details: { value: string | null }) => void;
	/**
	 * Callback invoked when hovering over an item (for prefetching content).
	 * Similar to Astro's link prefetching, this allows preloading data before selection.
	 */
	onPrefetch?: (value: string) => void;
	[key: string]: any;
}

let {
	children,
	class: className,
	size = "md",
	colour = "gray",
	value = $bindable(),
	defaultValue,
	name,
	orientation = "horizontal",
	disabled = false,
	readOnly = false,
	onValueChange,
	onPrefetch,
	...restProps
}: Props = $props();

const classes = $derived(segmentGroup({ size, disabled }));
const colourVars = $derived(getColourStyle(colour));

setContext<SegmentGroupContext>(SEGMENT_GROUP_CTX, {
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
	get onPrefetch() {
		return onPrefetch;
	},
});

function handleValueChange(details: { value: string | null }) {
	value = details.value ?? undefined;
	onValueChange?.(details);
}
</script>

<SegmentGroup.Root
	value={value}
	defaultValue={defaultValue}
	name={name}
	orientation={orientation}
	disabled={disabled}
	readOnly={readOnly}
	onValueChange={handleValueChange}
	class={twMerge(classes.root(), className)}
	style={colourVars}
	{...restProps}
>
	{@render children?.()}
</SegmentGroup.Root>
