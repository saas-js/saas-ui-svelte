<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const CARD_CTX = Symbol("CARD_CTX");

	export const cardRoot = tv({
		base: [
			"wrap-break-word",
			"text-fg-default",
			"bg-bg-panel",
			"flex-col flex relative",
			"rounded-lg",
			"antialiased",
		],
		variants: {
			variant: {
				subtle: "bg-bg-subtle",
				outline: "border border-border-default",
				elevated: "shadow-md border-[0.5px] border-border-default",
			},
			size: {
				sm: "",
				md: "",
				lg: "",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type CardVariants = VariantProps<typeof cardRoot>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { setContext } from "svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The card content.
		 */
		children: Snippet;
		/**
		 * The visual style of the card.
		 * @default "outline"
		 */
		variant?: CardVariants["variant"];
		/**
		 * The size of the card.
		 * @default "md"
		 */
		size?: CardVariants["size"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Inline styles to apply to the card.
		 */
		style?: string;
	}

	let {
		children,
		variant = "outline",
		size = "md",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const finalClass = $derived(cardRoot({ variant, size, class: className }));

	// Set context for child components
	let contextState = $state<{ size: CardVariants["size"]; variant: CardVariants["variant"] }>({
		size: "md",
		variant: "outline",
	});

	$effect(() => {
		contextState.size = size;
		contextState.variant = variant;
	});

	setContext(CARD_CTX, contextState);
</script>

<div class={finalClass} {style} {...restProps}>
	{@render children()}
</div>
