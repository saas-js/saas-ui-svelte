<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

export const paginationRoot = tv({
	base: [],
});

export const paginationControl = tv({
	base: ["items-center", "flex", "gap-2"],
	variants: {
		attached: {
			true: "isolate inline-flex relative gap-0",
			false: "",
		},
		compact: {
			true: "gap-4",
			false: "",
		},
	},
	defaultVariants: {
		attached: false,
		compact: false,
	},
});

export const paginationItem = tv({
	base: [
		"appearance-none",
		"select-none",
		"whitespace-nowrap",
		"align-middle",
		"cursor-pointer",
		"isolate",
		"text-fg-default",
		"outline-0",
		"shrink-0",
		"justify-center",
		"items-center",
		"font-medium",
		"antialiased",
		"transition-colors",
		"duration-200",
		"inline-flex",
		"relative",
		"rounded",
		"focus-visible:outline-offset-2",
		"focus-visible:outline-1",
		"focus-visible:outline-solid",
		"focus-visible:outline-(--c-focus-ring)",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
	],
	variants: {
		size: {
			xs: "gap-1 min-w-6 h-6 text-xs leading-4 px-2 rounded-xs",
			sm: "gap-2 min-w-7 h-7 text-[.8125rem] leading-[1.1375rem] px-2.5",
			md: "gap-2 min-w-8 h-8 text-[.8125rem] leading-[1.1375rem] px-3",
			lg: "gap-3 min-w-10 h-10 text-sm leading-[1.26rem] px-[1.125rem] rounded-md",
		},
		variant: {
			ghost: "",
			outline: "border-[0.5px] border-border-default",
			solid: "",
		},
		current: {
			true: "",
			false: "",
		},
		attached: {
			true: "-mr-px focus-visible:z-1 rounded-none first:rounded-l last:rounded-r",
			false: "",
		},
	},
	compoundVariants: [
		// Ghost non-current: solid transparent border for smooth transition, hover to bg-subtle
		{
			variant: "ghost",
			current: false,
			class: "border-[0.5px] border-solid border-transparent hover:bg-bg-subtle",
		},
		// Ghost current: solid emphasized border, hover to bg-muted
		{
			variant: "ghost",
			current: true,
			class: "border-[0.5px] border-solid border-border-emphasized hover:bg-bg-muted",
		},
		// Outline non-current: add hover
		{
			variant: "outline",
			current: false,
			class: "hover:bg-bg-subtle",
		},
		// Outline current: styled, no hover change
		{
			variant: "outline",
			current: true,
			class: "shadow text-(--c-contrast) bg-(--c-solid) border-transparent",
		},
		// Solid non-current: emphasized border, hover to bg-muted
		{
			variant: "solid",
			current: false,
			class: "border-[0.5px] border-solid border-border-emphasized hover:bg-bg-muted",
		},
		// Solid current: solid bg, no border, with hover effect
		{
			variant: "solid",
			current: true,
			class: "border-0 shadow text-(--c-contrast) bg-(--c-solid) hover:bg-(--c-solid)/90",
		},
	],
	defaultVariants: {
		size: "md",
		variant: "ghost",
		current: false,
		attached: false,
	},
});

export const paginationTrigger = tv({
	base: ["appearance-auto"],
	variants: {
		attached: {
			true: "-mr-px focus-visible:z-1",
			false: "",
		},
	},
	defaultVariants: {
		attached: false,
	},
});

export const paginationEllipsis = tv({
	base: [
		"select-none",
		"whitespace-nowrap",
		"align-middle",
		"isolate",
		"text-fg-default",
		"outline-0",
		"shrink-0",
		"justify-center",
		"items-center",
		"font-medium",
		"antialiased",
		"transition-colors",
		"duration-200",
		"inline-flex",
		"relative",
		"rounded",
	],
	variants: {
		size: {
			xs: "gap-1 min-w-6 h-6 text-xs leading-4 rounded-xs [&_svg]:size-2.5",
			sm: "gap-2 min-w-7 h-7 text-[.8125rem] leading-[1.1375rem] [&_svg]:size-3.5",
			md: "gap-2 min-w-8 h-8 text-[.8125rem] leading-[1.1375rem] [&_svg]:size-3.5",
			lg: "gap-3 min-w-10 h-10 text-sm leading-[1.26rem] px-[1.125rem] rounded-md [&_svg]:size-4",
		},
		variant: {
			ghost: "",
			outline: "border-[0.5px] border-border-default hover:bg-bg-subtle",
			solid: "border-[0.5px] border-border-default hover:bg-bg-subtle",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "ghost",
	},
});

export const paginationPageText = tv({
	base: ["wrap-break-word", "font-medium", "text-fg-default"],
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-sm",
			lg: "text-sm",
		},
		flex: {
			true: "flex-1",
			false: "",
		},
	},
	defaultVariants: {
		size: "md",
		flex: false,
	},
});

export type PaginationVariants = VariantProps<typeof paginationItem>;
</script>

<script lang="ts">
import { Pagination } from "@ark-ui/svelte/pagination";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { Flex } from "$saas/layout/flex";
import { Text } from "$saas/typography/text";

interface Props {
	/**
	 * Total number of data items.
	 */
	count: number;
	/**
	 * Number of data items per page.
	 * @default 10
	 */
	pageSize?: number;
	/**
	 * The controlled active page.
	 */
	page?: number;
	/**
	 * The initial active page when uncontrolled.
	 * @default 1
	 */
	defaultPage?: number;
	/**
	 * Number of pages to show beside active page.
	 * @default 1
	 */
	siblingCount?: number;
	/**
	 * The size of the pagination items.
	 * @default "md"
	 */
	size?: PaginationVariants["size"];
	/**
	 * The visual style variant of the pagination.
	 * @default "ghost"
	 */
	variant?: PaginationVariants["variant"];
	/**
	 * The colour theme of the pagination.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether to show compact page text instead of page items.
	 * @default false
	 */
	compact?: boolean;
	/**
	 * The format of the page text when compact is true.
	 * "short" shows "1 of 7", "long" shows "1 - 5 of 50".
	 * @default "short"
	 */
	pageTextFormat?: "short" | "long";
	/**
	 * Whether items should be visually attached.
	 * @default false
	 */
	attached?: boolean;
	/**
	 * The type of the trigger element.
	 * @default "button"
	 */
	type?: "button" | "link";
	/**
	 * Function to generate href attributes for pagination links.
	 * Only used when type is "link".
	 */
	getHref?: (page: number) => string;
	/**
	 * Called when the page number changes.
	 */
	onPageChange?: (details: { page: number }) => void;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: ClassNameValue;
	/**
	 * Inline styles.
	 */
	style?: string;
	/**
	 * The id of the pagination element.
	 */
	id?: string;
	/**
	 * Accessible label for the pagination navigation.
	 * Required when multiple paginations exist on a page.
	 * @default "pagination"
	 */
	"aria-label"?: string;
}

let {
	count,
	pageSize = 10,
	page = $bindable(),
	defaultPage = 1,
	siblingCount = 1,
	size = "md",
	variant = "ghost",
	colour = "gray",
	compact = false,
	pageTextFormat = "short",
	attached = false,
	type = "button",
	getHref,
	onPageChange,
	class: className,
	style,
	id,
	"aria-label": ariaLabel = "pagination",
}: Props = $props();

// Convert getHref to getPageUrl format for Ark UI
const getPageUrl = $derived(
	getHref ? (details: { page: number }) => getHref(details.page) : undefined,
);

const colourVars = $derived(getColourStyle(colour));
const styles = $derived([colourVars, style].filter(Boolean).join("; "));

const controlClasses = $derived(
	paginationControl({
		attached,
		compact: compact || pageTextFormat === "long",
	}),
);

const getItemClasses = (isCurrent: boolean) =>
	paginationItem({
		size,
		variant,
		current: isCurrent,
		attached,
	}) as string;

const triggerClasses = $derived(paginationTrigger({ attached }) as string);

const ellipsisClasses = $derived(
	paginationEllipsis({ size, variant }) as string,
);

const pageTextClasses = $derived(
	paginationPageText({ size, flex: pageTextFormat === "long" }) as string,
);

const getPageText = (currentPage: number, totalPages: number) => {
	if (pageTextFormat === "long") {
		const start = (currentPage - 1) * pageSize + 1;
		const end = Math.min(currentPage * pageSize, count);
		return `${start} - ${end} of ${count}`;
	}
	return `${currentPage} of ${totalPages}`;
};
</script>

<Pagination.Root
	class={twMerge(paginationRoot(), className as string)}
	style={styles}
	id={id}
	count={count}
	pageSize={pageSize}
	page={page}
	defaultPage={defaultPage}
	siblingCount={siblingCount}
	type={type}
	getPageUrl={getPageUrl}
	onPageChange={onPageChange}
	aria-label={ariaLabel}
>
	<Pagination.Context>
		{#snippet render(api)}
			{@const ctx = api()}
			{@const pages = ctx.pages}
			<Flex align="center" class={controlClasses}>
				<Pagination.PrevTrigger class={triggerClasses} />

				{#if compact || pageTextFormat === "long"}
					<Text as="span" class={pageTextClasses}>
						{getPageText(ctx.page, ctx.totalPages)}
					</Text>
				{:else}
					{#each pages as pageItem, idx}
						{#if pageItem.type === "page"}
							<Pagination.Item
								{...pageItem}
								class={getItemClasses(
									ctx.page === pageItem.value,
								)}
							>
								{pageItem.value}
							</Pagination.Item>
						{:else}
							{@const ellipsisIndex = pages
								.slice(0, idx)
								.filter((p) => p.type === "ellipsis").length}
							<Pagination.Ellipsis
								index={ellipsisIndex}
								class={ellipsisClasses}
							>
								<svg
									viewBox="0 0 24 24"
									class="fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
									aria-hidden="true"
								>
									<circle cx="12" cy="12" r="1"></circle>
									<circle cx="19" cy="12" r="1"></circle>
									<circle cx="5" cy="12" r="1"></circle>
								</svg>
							</Pagination.Ellipsis>
						{/if}
					{/each}
				{/if}

				<Pagination.NextTrigger class={triggerClasses} />
			</Flex>
		{/snippet}
	</Pagination.Context>
</Pagination.Root>
