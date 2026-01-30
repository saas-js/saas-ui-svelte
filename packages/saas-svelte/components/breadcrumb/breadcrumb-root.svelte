<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet, Component } from "svelte";

export const BREADCRUMB_CTX = Symbol("BREADCRUMB_CTX");

export interface BreadcrumbContext {
	size: BreadcrumbVariants["size"];
	variant: BreadcrumbVariants["variant"];
	separator: Component<any> | string;
	styles: ReturnType<typeof breadcrumb>;
}

export const breadcrumb = tv({
	slots: {
		root: "[word-break:break-word] text-fg-muted items-center flex font-normal antialiased",
		item: "items-center inline-flex",
		separator: "text-fg-muted opacity-80",
		ellipsis: "justify-center items-center inline-flex",
	},
	variants: {
		size: {
			sm: {
				root: "text-xs leading-4 gap-1",
			},
			md: {
				root: "text-[13px] leading-[1.4] gap-1.5",
			},
			lg: {
				root: "text-sm leading-5 gap-2",
			},
		},
		variant: {
			plain: {},
			underline: {},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "plain",
	},
});

export type BreadcrumbVariants = VariantProps<typeof breadcrumb>;
</script>

<script lang="ts">
import { setContext } from "svelte";

interface Props extends HTMLAttributes<HTMLElement> {
	/**
	 * The breadcrumb items.
	 */
	children: Snippet;
	/**
	 * The size of the breadcrumb.
	 * @default "md"
	 */
	size?: BreadcrumbVariants["size"];
	/**
	 * The visual style of the breadcrumb links.
	 * @default "plain"
	 */
	variant?: BreadcrumbVariants["variant"];
	/**
	 * The separator element between breadcrumb items. Can be a string or SVG component.
	 * @default "/"
	 */
	separator?: Component<any> | string;
	/**
	 * The gap around separators (in spacing units).
	 */
	separatorGap?: string | number;
	/**
	 * Accessible label for the breadcrumb navigation.
	 * @default "Breadcrumb"
	 */
	ariaLabel?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	children,
	size = "md",
	variant = "plain",
	separator = "/",
	separatorGap,
	ariaLabel = "Breadcrumb",
	class: className,
	...restProps
}: Props = $props();

const styles = $derived(breadcrumb({ size, variant }));
const separatorGapStyle = $derived(
	separatorGap ? `gap: calc(${separatorGap} * 0.25rem)` : undefined,
);

// Provide context to child components
setContext<BreadcrumbContext>(BREADCRUMB_CTX, {
	get size() {
		return size;
	},
	get variant() {
		return variant;
	},
	get separator() {
		return separator;
	},
	get styles() {
		return styles;
	},
});
</script>

<nav aria-label={ariaLabel} {...restProps}>
	<ol class={styles.root({ class: className })} style={separatorGapStyle}>
		{@render children()}
	</ol>
</nav>
