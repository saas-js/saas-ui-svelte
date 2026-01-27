<script lang="ts" module>
	import type { Snippet } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";
	import { getContext } from "svelte";

	const TABLE_CONTEXT_KEY = "saas-table-context";

	const tableRecipe = tv({
		slots: {
			root: "w-full border-inherit [font-variant-numeric:lining-nums_tabular-nums] align-top [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
			header: "",
			body: "",
			footer: "",
			row: "not-last:border-b not-last:border-border-default",
			columnHeader:
				"font-medium border-b border-border-default text-left text-fg-default",
			cell: "items-center",
			caption: "mt-4 text-fg-muted",
			scrollArea:
				"block whitespace-nowrap overflow-x-auto overflow-y-auto",
			columnGroup: "",
			column: "",
		},
		variants: {
			/**
			 * The size of the table.
			 * @default "md"
			 */
			size: {
				sm: {
					root: "text-sm leading-sm",
					columnHeader: "p-2",
					cell: "p-2",
				},
				md: {
					root: "text-sm leading-md",
					columnHeader: "p-3",
					cell: "p-3",
				},
				lg: {
					root: "text-md leading-lg",
					columnHeader: "px-4 py-3",
					cell: "px-4 py-3",
				},
			},
			/**
			 * The visual variant of the table.
			 * @default "line"
			 */
			variant: {
				line: {},
				outline: {
					root: "shadow",
					header: "bg-bg-subtle",
				},
			},
			/**
			 * Whether to show the outer border. Set to false when embedded in ScrollArea.
			 * @default true
			 */
			showOuterBorder: {
				true: {},
				false: {},
			},
			/**
			 * Enable row hover highlighting.
			 * @default false
			 */
			interactive: {
				true: {
					row: "hover:bg-bg-subtle",
				},
			},
			/**
			 * Make the header sticky.
			 * @default false
			 */
			stickyHeader: {
				true: {
					columnHeader: "sticky top-0 bg-bg-default z-1",
				},
			},
			/**
			 * Add zebra-stripe pattern to rows.
			 * @default false
			 */
			striped: {
				true: {
					body: "[&>tr:nth-child(odd)]:bg-bg-muted",
				},
			},
			/**
			 * Show borders between columns.
			 * @default false
			 */
			showColumnBorder: {
				true: {
					columnHeader:
						"border-x border-border-default first:border-l-0 last:border-r-0",
					cell: "border-x border-border-default first:border-l-0 last:border-r-0",
				},
			},
		},
		compoundVariants: [
			{
				variant: "outline",
				showOuterBorder: true,
				class: {
					root: "border border-border-default rounded-md overflow-hidden",
				},
			},
			{
				variant: "outline",
				stickyHeader: true,
				class: {
					columnHeader: "bg-bg-subtle",
				},
			},
		],
		defaultVariants: {
			size: "md",
			variant: "line",
			interactive: false,
			stickyHeader: false,
			striped: false,
			showColumnBorder: false,
			showOuterBorder: true,
		},
	});

	export interface TableContext {
		styles: ReturnType<typeof tableRecipe>;
	}

	export function getTableContext(): TableContext | undefined {
		return getContext(TABLE_CONTEXT_KEY);
	}

	export type TableVariants = VariantProps<typeof tableRecipe>;

	export interface TableRootProps {
		/**
		 * The size of the table.
		 * @default "md"
		 */
		size?: TableVariants["size"];
		/**
		 * The visual variant of the table.
		 * @default "line"
		 */
		variant?: TableVariants["variant"];
		/**
		 * Enable row hover highlighting.
		 * @default false
		 */
		interactive?: boolean;
		/**
		 * Make the header sticky.
		 * @default false
		 */
		stickyHeader?: boolean;
		/**
		 * Add zebra-stripe pattern to rows.
		 * @default false
		 */
		striped?: boolean;
		/**
		 * Show borders between columns.
		 * @default false
		 */
		showColumnBorder?: boolean;
		/**
		 * Whether to show the outer border. Set to false when embedded in ScrollArea.
		 * @default true
		 */
		showOuterBorder?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Table content.
		 */
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { setContext } from "svelte";

	let {
		size = "md",
		variant = "line",
		interactive = false,
		stickyHeader = false,
		striped = false,
		showColumnBorder = false,
		showOuterBorder = true,
		class: className,
		children,
	}: TableRootProps = $props();

	const styles = $derived(
		tableRecipe({
			size,
			variant,
			interactive,
			stickyHeader,
			striped,
			showColumnBorder,
			showOuterBorder,
		}),
	);

	setContext(TABLE_CONTEXT_KEY, {
		get styles() {
			return styles;
		},
	});
</script>

<table class={twMerge(styles.root(), className)}>
	{#if children}
		{@render children()}
	{/if}
</table>
