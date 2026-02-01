<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export type SelectContext = {
		size: SelectVariants["size"];
		variant: SelectVariants["variant"];
		styles: ReturnType<typeof select>;
		colourStyle: string;
	};

	export const select = tv({
		slots: {
			root: ["flex", "flex-col", "gap-1.5", "w-full"],
			label: [
				"select-none",
				"font-medium",
				"text-fg-default",
				"data-disabled:text-fg-muted",
				"data-disabled:cursor-not-allowed",
			],
			control: ["relative", "w-full"],
			trigger: [
				"appearance-none",
				"select-none",
				"text-start",
				"justify-between",
				"items-center",
				"gap-2",
				"w-full",
				"flex",
				"rounded-md",
				"text-fg-default",
				"cursor-pointer",
				"outline-none",
				"antialiased",
				"transition-colors",
				"duration-fast",
				"disabled:opacity-50",
				"disabled:cursor-not-allowed",
				"focus-visible:transition-none",
				"focus-visible:outline-1",
				"focus-visible:outline-solid",
				"focus-visible:outline-(--c-focus-ring)",
				"focus-visible:outline-offset-0",
				"data-invalid:border-border-error",
				"data-invalid:focus-visible:outline-border-error",
			],
			valueText: [
				"flex",
				"items-center",
				"gap-2",
				"max-w-[80%]",
				"min-w-0",
				"overflow-hidden",
			],
			placeholder: ["text-fg-muted"],
			indicator: [
				"justify-center",
				"items-center",
				"flex",
				"text-fg-muted",
				"shrink-0",
				"pointer-events-none",
			],
			positioner: ["z-dropdown"],
			content: [
				"flex",
				"flex-col",
				"min-w-32",
				"max-h-96",
				"p-1",
				"rounded-lg",
				"bg-bg-overlay",
				"backdrop-blur-lg",
				"shadow-overlay",
				"border",
				"border-border-default",
				"outline-none",
				"overflow-y-auto",
				"antialiased",
				"[scrollbar-width:thin]",
				"[scrollbar-color:var(--color-border-default)_transparent]",
				"data-[state=open]:animate-dialog-in",
				"data-[state=closed]:animate-dialog-out",
			],
			item: [
				"flex",
				"flex-1",
				"items-center",
				"gap-2",
				"relative",
				"rounded",
				"text-fg-default",
				"cursor-default",
				"select-none",
				"outline-none",
				"text-start",
				"antialiased",
				"data-highlighted:bg-bg-subtle",
				"data-disabled:opacity-50",
				"data-disabled:cursor-not-allowed",
			],
			itemText: ["flex-1", "truncate"],
			itemIndicator: [
				"flex",
				"items-center",
				"justify-center",
				"shrink-0",
				"ml-auto",
			],
			itemGroup: ["flex", "flex-col", "[&+&]:mt-1"],
			itemGroupLabel: [
				"flex",
				"items-center",
				"font-medium",
				"text-fg-default",
				"select-none",
			],
			clearTrigger: [
				"appearance-none",
				"select-none",
				"cursor-pointer",
				"outline-none",
				"shrink-0",
				"justify-center",
				"items-center",
				"inline-flex",
				"rounded",
				"text-fg-muted",
				"pointer-events-auto",
				"focus-visible:outline-1",
				"focus-visible:outline-solid",
				"focus-visible:outline-fg-muted",
				"focus-visible:outline-offset-2",
				"disabled:opacity-50",
				"disabled:cursor-not-allowed",
			],
		},
		variants: {
			size: {
				xs: {
					label: "text-sm leading-sm",
					trigger: "min-h-6 text-xs leading-xs px-2 gap-1",
					content: "text-xs leading-xs p-1",
					item: "text-xs leading-xs px-2 py-1",
					itemIndicator: "size-3",
					itemGroupLabel: "text-xs leading-xs px-2 py-1",
					indicator: "size-3.5",
					clearTrigger: "size-5",
				},
				sm: {
					label: "text-sm leading-sm",
					trigger: "min-h-7 text-sm leading-sm px-2.5 gap-1",
					content: "text-sm leading-sm p-1",
					item: "text-sm leading-sm px-1.5 py-1",
					itemIndicator: "size-3.5",
					itemGroupLabel: "text-sm leading-sm px-1.5 py-1",
					indicator: "size-4",
					clearTrigger: "size-6",
				},
				md: {
					label: "text-sm leading-sm",
					trigger: "min-h-8 text-sm leading-sm px-3 gap-2",
					content: "text-sm leading-sm p-1",
					item: "text-sm leading-sm px-2 py-1.5",
					itemIndicator: "size-4",
					itemGroupLabel: "text-sm leading-sm px-2 py-1.5",
					indicator: "size-4",
					clearTrigger: "size-6",
				},
				lg: {
					label: "text-sm leading-sm",
					trigger: "min-h-10 text-md leading-md px-3.5 gap-2",
					content: "text-md leading-md p-1.5",
					item: "text-md leading-md px-3 py-2",
					itemIndicator: "size-4",
					itemGroupLabel: "text-md leading-md px-3 py-2",
					indicator: "size-5",
					clearTrigger: "size-7",
				},
			},
			variant: {
				outline: {
					trigger: [
						"border",
						"border-border-default",
						"bg-bg-default",
						"hover:border-border-emphasized",
						"data-[state=open]:border-border-emphasized",
						"data-invalid:data-[state=open]:border-border-error",
					],
				},
				subtle: {
					trigger: [
						"border",
						"border-transparent",
						"bg-bg-subtle",
						"hover:border-border-default",
						"data-[state=open]:border-border-default",
						"data-invalid:data-[state=open]:border-border-error",
					],
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
		},
	});

	export type SelectVariants = VariantProps<typeof select>;

	export const SELECT_CTX = Symbol("SELECT_CTX");
</script>

<script lang="ts">
	import { Select } from "@ark-ui/svelte/select";
	import type {
		SelectRootProps,
		SelectOpenChangeDetails,
	} from "@ark-ui/svelte/select";
	import { getContext, setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";
	import {
		registerOverlay,
		unregisterOverlay,
	} from "$saas/utils/overlay-singleton.svelte.js";

	interface Props extends Omit<SelectRootProps<any>, "id" | "collection"> {
		/**
		 * The select content.
		 */
		children: Snippet;
		/**
		 * The collection of items to display.
		 */
		collection: SelectRootProps<any>["collection"];
		/**
		 * The unique identifier for the select.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The size of the select.
		 * @default "md"
		 */
		size?: SelectVariants["size"];
		/**
		 * The visual variant of the select trigger.
		 * @default "outline"
		 */
		variant?: SelectVariants["variant"];
		/**
		 * The colour palette for highlighted items.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		collection,
		id,
		size = "md",
		variant = "outline",
		colour = "indigo",
		class: className,
		positioning,
		onOpenChange,
		...restProps
	}: Props = $props();

	let instanceId: symbol | null = $state(null);
	let lastValue: string[] = $state([]);

	function handleOpenChange(details: SelectOpenChangeDetails) {
		if (details.open) {
			lastValue = details.value;
			if (!instanceId) {
				instanceId = registerOverlay("select", () => {
					onOpenChange?.({ open: false, value: lastValue });
				});
			}
		} else if (instanceId) {
			unregisterOverlay("select", instanceId);
			instanceId = null;
		}
		onOpenChange?.(details);
	}

	const fieldContext = getContext<FieldContext>(FIELD_CTX);
	const fieldState = $derived($fieldContext ?? {});
	const isInvalid = $derived(fieldState.invalid || false);

	const uniqueId = $derived(id || fieldState.id);

	const mergedPositioning = $derived({ sameWidth: true, ...positioning });

	const ctx: SelectContext = {
		get size() {
			return size;
		},
		get variant() {
			return variant;
		},
		get styles() {
			return select({ size, variant });
		},
		get colourStyle() {
			return getColourStyle(colour);
		},
	};

	setContext(SELECT_CTX, ctx);

	const rootClass = $derived(twMerge(ctx.styles.root(), className as string));
</script>

<Select.Root
	id={uniqueId}
	{collection}
	invalid={isInvalid}
	positioning={mergedPositioning}
	class={rootClass}
	onOpenChange={handleOpenChange}
	{...restProps}
>
	{@render children?.()}
</Select.Root>
