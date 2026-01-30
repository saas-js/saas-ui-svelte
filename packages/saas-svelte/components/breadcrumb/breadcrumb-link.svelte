<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const breadcrumbLink = tv({
	base: [
		"outline-0",
		"items-center",
		"gap-2",
		"inline-flex",
		"rounded",
		"font-normal",
		"transition-none",
		"focus:outline-offset-2",
		"focus:outline-1",
		"focus:outline-solid",
		"focus:outline-fg-muted",
	],
	variants: {
		variant: {
			// Plain variant: muted (gray-500) text, no underline, hover to default
			plain: ["text-fg-muted", "no-underline", "hover:text-fg-default"],
			// Underline variant: default text with underline, hover increases contrast
			underline: [
				"underline",
				"text-fg-default",
				"underline-offset-[0.2em]",
				"decoration-fg-default/20",
				"hover:decoration-fg-default",
			],
		},
	},
	defaultVariants: {
		variant: "plain",
	},
});

export type BreadcrumbLinkVariants = VariantProps<typeof breadcrumbLink>;
</script>

<script lang="ts">
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import {
	BREADCRUMB_CTX,
	type BreadcrumbContext,
} from "./breadcrumb-root.svelte";

type BaseProps = {
	/**
	 * The link content.
	 */
	children: Snippet;
	/**
	 * Whether to show the separator after this link.
	 * @default true
	 */
	showSeparator?: boolean;
	/**
	 * Render as a button instead of an anchor.
	 * @default "a"
	 */
	as?: "a" | "button";
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
};

type Props = BaseProps & HTMLAnchorAttributes & HTMLButtonAttributes;

let {
	children,
	showSeparator = true,
	as = "a",
	class: className,
	...restProps
}: Props = $props();

const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
const styles = $derived(context?.styles);
const variant = $derived(context?.variant ?? "plain");

const linkClasses = $derived(breadcrumbLink({ variant, class: className }));
</script>

<li class={styles?.item()}>
	{#if as === "button"}
		<button class={linkClasses} {...restProps}>
			{@render children()}
		</button>
	{:else}
		<a class={linkClasses} {...restProps}>
			{@render children()}
		</a>
	{/if}
</li>

{#if showSeparator}
	<li aria-hidden="true" class={styles?.separator()}>
		{#if typeof context?.separator === "string"}
			{context.separator}
		{:else if context?.separator}
			{@const Separator = context.separator}
			<Separator class="h-3.5 w-3.5 fill-current stroke-current" />
		{:else}
			/
		{/if}
	</li>
{/if}
