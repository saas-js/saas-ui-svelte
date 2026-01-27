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

	const linkClasses = $derived.by(() => {
		const baseClasses = [
			"outline-0",
			"items-center",
			"gap-y-2 gap-x-2",
			"inline-flex",
			"rounded",
			"font-normal",
			"transition-none",
			"focus:outline-offset-2",
			"focus:outline-1",
			"focus:outline-solid",
			"focus:outline-fg-muted",
		];

		if (variant === "plain") {
			// Plain variant: muted (gray-500) text, no underline, hover to default
			baseClasses.push(
				"text-fg-muted",
				"no-underline",
				"hover:text-fg-default",
			);
		} else {
			// Underline variant: default text with underline, hover increases contrast
			baseClasses.push(
				"underline",
				"text-fg-default",
				"underline-offset-[0.2em]",
				"decoration-fg-default/20",
				"hover:decoration-fg-default",
			);
		}

		return [...baseClasses, className].filter(Boolean).join(" ");
	});
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
			<Separator class="fill-current stroke-current w-3.5 h-3.5" />
		{:else}
			/
		{/if}
	</li>
{/if}
