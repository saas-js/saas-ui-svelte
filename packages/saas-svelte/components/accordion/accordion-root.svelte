<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const ACCORDION_CTX = Symbol("ACCORDION_CTX");

	export const accordion = tv({
		slots: {
			root: "w-full",
			item: "[overflow-anchor:none]",
			trigger: [
				"appearance-auto flex items-center gap-3 w-full",
				"rounded-md",
				"outline-none",
				"focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-fg-muted",
				"disabled:opacity-50 disabled:cursor-not-allowed",
			],
			content: "overflow-hidden rounded-md",
			contentBody: "",
			indicator:
				"flex items-center justify-center text-fg-muted shrink-0 transition-all duration-moderate ml-auto origin-center data-[state=open]:rotate-90",
			icon: "shrink-0 text-fg-muted",
		},
		variants: {
			size: {
				sm: {
					trigger: "text-sm leading-sm py-2 font-medium",
					content: "text-sm leading-sm",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				md: {
					trigger: "text-sm leading-sm py-2 font-medium",
					content: "text-sm leading-sm",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				lg: {
					trigger: "text-md leading-md py-2.5 font-medium",
					content: "text-md leading-md",
					contentBody: "pt-2.5 pb-5",
					indicator: "size-4",
					icon: "size-4",
				},
			},
			variant: {
				outline: {
					item: "border-b border-border-default",
				},
				subtle: {
					item: "rounded-md data-[state=open]:bg-bg-subtle",
					trigger: "px-4",
					contentBody: "px-4",
				},
				enclosed: {
					root: "border border-border-default rounded-md",
					item: "border-b border-border-default last:border-b-0 data-[state=open]:bg-bg-subtle",
					trigger: "px-4",
					contentBody: "px-4",
				},
				plain: {
					item: "border-0",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
		},
	});

	export type AccordionVariants = VariantProps<typeof accordion>;

	export interface AccordionContext {
		styles: ReturnType<typeof accordion>;
	}
</script>

<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import CaretRight from "phosphor-svelte/lib/CaretRight";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	export interface AccordionItem {
		value: string;
		title: string;
		content: string;
		disabled?: boolean;
	}

	interface Props {
		/**
		 * Content to render inside the accordion (composition API).
		 */
		children?: Snippet;
		/**
		 * Array of items for simple usage.
		 */
		items?: AccordionItem[];
		class?: string;
		/**
		 * Whether accordion items can be collapsed.
		 * @default false
		 */
		collapsible?: boolean;
		/**
		 * The default value(s) of the accordion items to open.
		 */
		defaultValue?: string[];
		/**
		 * Unique identifier for the accordion. Required for accessibility.
		 */
		id: string;
		/**
		 * Whether multiple accordion items can be open at once.
		 * @default false
		 */
		multiple?: boolean;
		/**
		 * The size of the accordion.
		 * @default "md"
		 */
		size?: AccordionVariants["size"];
		/**
		 * The visual style of the accordion.
		 * @default "outline"
		 */
		variant?: AccordionVariants["variant"];
		[key: string]: any;
	}

	let {
		children,
		items,
		class: className,
		collapsible = false,
		defaultValue,
		id,
		multiple = false,
		size = "md",
		variant = "outline",
		...restProps
	}: Props = $props();

	const classes = $derived(accordion({ size, variant }));

	setContext<AccordionContext>(ACCORDION_CTX, {
		get styles() {
			return classes;
		},
	});
</script>

<Accordion.Root
	{id}
	{collapsible}
	{defaultValue}
	{multiple}
	class={twMerge(
		"text-fg-default leading-normal antialiased",
		classes.root(),
		className,
	)}
	{...restProps}
>
	{#if items}
		{#each items as item}
			<Accordion.Item
				class={classes.item()}
				value={item.value}
				disabled={item.disabled}
			>
				<Accordion.ItemTrigger class={classes.trigger()}>
					{item.title}
					<Accordion.ItemIndicator class={classes.indicator()}>
						<CaretRight
							class="text-current inline-block w-full h-full"
							weight="bold"
						/>
					</Accordion.ItemIndicator>
				</Accordion.ItemTrigger>
				<Accordion.ItemContent
					class={twMerge(
						classes.content(),
						"data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
					)}
				>
					<div class={classes.contentBody()}>
						{item.content}
					</div>
				</Accordion.ItemContent>
			</Accordion.Item>
		{/each}
	{:else if children}
		{@render children()}
	{/if}
</Accordion.Root>
