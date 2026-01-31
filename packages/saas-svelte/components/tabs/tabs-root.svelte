<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { ColourName } from "$saas/utils/colours";

export const TABS_CTX = Symbol("TABS_CTX");

export const tabs = tv({
	slots: {
		root: "relative antialiased text-fg-default",
		list: "isolate relative flex",
		trigger: [
			"appearance-auto cursor-pointer outline-0",
			"flex items-center gap-2",
			"font-medium",
			"relative",
			"focus-visible:z-1",
			"disabled:cursor-not-allowed disabled:opacity-50",
		],
		content: "focus-visible:outline-0 w-full pt-4",
		indicator:
			"absolute z-0 transition-[left,top,width,height] duration-moderate",
		contentGroup: "",
	},
	variants: {
		size: {
			xs: {
				list: "min-h-6",
				trigger: "min-w-6 h-6 text-2xs leading-2xs px-2.5 py-1",
				content: "text-xs",
			},
			sm: {
				list: "min-h-7",
				trigger: "min-w-7 h-7 text-xs leading-xs px-3 py-1.5",
				content: "text-sm",
			},
			md: {
				list: "min-h-8",
				trigger: "min-w-8 h-8 text-sm leading-sm px-4 py-2",
				content: "text-sm",
			},
			lg: {
				list: "min-h-9",
				trigger: "min-w-9 h-9 text-md leading-md px-5 py-2.5",
				content: "text-md",
			},
		},
		variant: {
			line: {
				list: "border-b border-border-default",
				trigger: [
					"text-fg-muted",
					"hover:text-fg-default",
					"data-selected:text-(--c-fg)",
					"relative",
					"before:content-[''] before:absolute before:-bottom-px before:inset-x-3 before:h-0.5 before:rounded-t",
					"data-selected:before:bg-(--c-solid)",
				],
			},
			subtle: {
				trigger: [
					"text-fg-muted",
					"hover:text-fg-default",
					"data-selected:text-(--c-fg)",
				],
			},
			enclosed: {
				list: [
					"before:content-[''] before:w-full before:absolute before:border-b before:border-border-default before:bottom-0",
				],
				trigger: [
					"border border-transparent",
					"-mb-px rounded-t",
					"-mr-px",
					"text-fg-muted",
					"hover:text-fg-default",
					"data-selected:border-t-border-default",
					"data-selected:border-x-border-default",
					"data-selected:border-b-transparent",
					"data-selected:bg-bg-default",
					"data-selected:text-(--c-fg)",
				],
			},
			outline: {
				list: "inline-flex rounded-md border border-border-default bg-bg-muted shadow-inner p-0.5",
				trigger: [
					"justify-center rounded-[5px] z-1",
					"text-fg-muted",
					"hover:text-fg-default",
					"data-selected:text-(--c-fg)",
				],
				indicator: "bg-bg-default rounded-[5px] shadow",
			},
			plain: {
				trigger: [
					"rounded",
					"text-fg-muted",
					"data-selected:text-(--c-fg)",
				],
			},
		},
		fitted: {
			true: {
				trigger: "flex-1",
			},
		},
		justify: {
			start: {
				list: "justify-start",
			},
			center: {
				list: "justify-center",
			},
			end: {
				list: "justify-end",
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "line",
	},
});

export type TabsVariants = VariantProps<typeof tabs>;
export type { ColourName };

export interface TabsContext {
	styles: ReturnType<typeof tabs>;
	onPrefetch?: (value: string) => void;
}
</script>

<script lang="ts">
import { Tabs } from "@ark-ui/svelte";
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * Content to render inside the tabs.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	/**
	 * The default value of the selected tab.
	 */
	defaultValue?: string;
	/**
	 * The controlled value of the selected tab.
	 */
	value?: string;
	/**
	 * The activation mode of the tabs.
	 * @default "automatic"
	 */
	activationMode?: "automatic" | "manual";
	/**
	 * Whether to enable lazy mounting.
	 * @default false
	 */
	lazyMount?: boolean;
	/**
	 * Whether to unmount tab content when not active.
	 * @default false
	 */
	unmountOnExit?: boolean;
	/**
	 * The orientation of the tabs.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Whether the keyboard navigation will loop.
	 * @default true
	 */
	loopFocus?: boolean;
	/**
	 * The size of the tabs.
	 * @default "md"
	 */
	size?: TabsVariants["size"];
	/**
	 * The visual style of the tabs.
	 * @default "line"
	 */
	variant?: TabsVariants["variant"];
	/**
	 * Whether tabs should stretch to fill the container.
	 * @default false
	 */
	fitted?: boolean;
	/**
	 * The alignment of the tabs.
	 */
	justify?: TabsVariants["justify"];
	/**
	 * The colour palette of the tabs.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Callback when the selected tab changes.
	 */
	onValueChange?: (details: { value: string }) => void;
	/**
	 * Callback invoked when hovering over a tab trigger (for prefetching content).
	 * Similar to Astro's link prefetching, this allows preloading data before selection.
	 */
	onPrefetch?: (value: string) => void;
	[key: string]: any;
}

let {
	children,
	class: className,
	defaultValue,
	value,
	activationMode = "automatic",
	lazyMount = false,
	unmountOnExit = false,
	orientation = "horizontal",
	loopFocus = true,
	size = "md",
	variant = "line",
	fitted = false,
	justify,
	colour = "gray",
	onValueChange,
	onPrefetch,
	style,
	...restProps
}: Props = $props();

const classes = $derived(tabs({ size, variant, fitted, justify }));
const colourStyle = $derived(getColourStyle(colour));
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

setContext<TabsContext>(TABS_CTX, {
	get styles() {
		return classes;
	},
	get onPrefetch() {
		return onPrefetch;
	},
});
</script>

<Tabs.Root
	defaultValue={defaultValue}
	value={value}
	activationMode={activationMode}
	lazyMount={lazyMount}
	unmountOnExit={unmountOnExit}
	orientation={orientation}
	loopFocus={loopFocus}
	onValueChange={onValueChange}
	class={twMerge(classes.root(), className)}
	style={finalStyle}
	{...restProps}
>
	{@render children?.()}
</Tabs.Root>
