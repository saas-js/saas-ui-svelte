<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const DATA_LIST_CTX = Symbol("DATA_LIST_CTX");

	export const dataList = tv({
		slots: {
			root: ["flex", "flex-col", "antialiased"],
			item: ["inline-flex", "items-center"],
			label: ["flex", "items-center", "text-fg-muted"],
			value: ["flex", "flex-1"],
		},
		variants: {
			size: {
				sm: {
					root: "gap-3",
					item: "gap-4 text-xs leading-4",
					label: "gap-1 min-w-32",
				},
				md: {
					root: "gap-4",
					item: "gap-4 text-sm leading-5",
					label: "gap-1 min-w-32",
				},
				lg: {
					root: "gap-5",
					item: "gap-4 text-sm leading-5",
					label: "gap-1 min-w-32",
				},
			},
			orientation: {
				horizontal: {
					root: "flex-col",
					item: "flex-row items-center",
					value: "flex-1",
				},
				vertical: {
					root: "flex-col",
					item: "flex-col items-start",
					value: "w-full",
				},
			},
			divider: {
				true: {
					item: "not-first:border-t not-first:border-border-default not-first:pt-4",
				},
			},
		},
		defaultVariants: {
			size: "md",
			orientation: "horizontal",
			divider: false,
		},
	});

	export type DataListVariants = VariantProps<typeof dataList>;

	export interface DataListContext {
		styles: ReturnType<typeof dataList>;
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		/**
		 * The content of the data list.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply to the root element.
		 */
		class?: string;
		/**
		 * The size of the data list.
		 * @default "md"
		 */
		size?: DataListVariants["size"];
		/**
		 * The orientation of the data list.
		 * @default "horizontal"
		 */
		orientation?: DataListVariants["orientation"];
		/**
		 * The colour palette of the data list.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether to show dividers between items.
		 * @default false
		 */
		divider?: boolean;
		/**
		 * Inline styles to apply to the root element.
		 */
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		orientation = "horizontal",
		colour = "gray",
		divider = false,
		style,
		...restProps
	}: Props = $props();

	const classes = $derived(dataList({ size, orientation, divider }));
	const colourVars = $derived(getColourStyle(colour));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

	setContext<DataListContext>(DATA_LIST_CTX, {
		get styles() {
			return classes;
		},
	});
</script>

<dl
	data-orientation={orientation}
	class={twMerge(classes.root(), className)}
	style={finalStyle}
	{...restProps}
>
	{@render children()}
</dl>
