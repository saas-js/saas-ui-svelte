<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * Tailwind Variants styles for the List root component.
	 */
	export const listRoot = tv({
		base: ["antialiased", "text-sm"],
		variants: {
			variant: {
				marker: [
					"list-inside",
					"[&_::marker]:text-fg-muted",
					"[&_::marker]:tabular-nums",
				],
				plain: ["flex", "flex-col", "list-none"],
			},
			align: {
				start: "",
				center: "",
				end: "",
			},
		},
		defaultVariants: {
			variant: "marker",
			align: "start",
		},
	});

	export type ListRootVariants = VariantProps<typeof listRoot>;

	export const LIST_CTX = Symbol("LIST_CTX");

	export interface ListContext {
		variant: ListRootVariants["variant"];
		align: ListRootVariants["align"];
	}
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props
		extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
		/**
		 * The content to render inside the list (Svelte snippet or slot fallback for Astro).
		 */
		children?: Snippet;
		/**
		 * The HTML element to render.
		 * @default "ul"
		 */
		as?: "ul" | "ol";
		/**
		 * The visual style of the list.
		 * @default "marker"
		 */
		variant?: ListRootVariants["variant"];
		/**
		 * The alignment of list item content with indicators.
		 * @default "start"
		 */
		align?: ListRootVariants["align"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		as = "ul",
		variant = "marker",
		align = "start",
		class: className,
		...restProps
	}: Props = $props();

	let contextState = $state<ListContext>({
		variant: "marker",
		align: "start",
	});

	$effect(() => {
		contextState.variant = variant;
		contextState.align = align;
	});

	setContext<ListContext>(LIST_CTX, contextState);

	// For marker variant, apply the appropriate list style based on element type
	const listStyleClass = $derived(
		variant === "marker"
			? as === "ol"
				? "list-decimal"
				: "list-disc"
			: "",
	);

	const finalClass = $derived(
		twMerge(listRoot({ variant, align }), listStyleClass, className),
	);
</script>

{#if as === "ol"}
	<ol role="list" class={finalClass} {...restProps}>
		{@render children?.()}
	</ol>
{:else}
	<ul role="list" class={finalClass} {...restProps}>
		{@render children?.()}
	</ul>
{/if}
