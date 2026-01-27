<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			"whitespace-nowrap",
			"[word-spacing:-0.5em]",
			"select-none",
			"text-fg-default",
			"shrink-0",
			"items-center",
			"inline-flex",
			"px-1",
			"rounded",
			"font-medium",
			"antialiased",
		],
		variants: {
			variant: {
				raised: [
					"bg-bg-subtle",
					"border-t",
					"border-b-2",
					"border-x",
					"border-bg-muted",
				],
				outline: ["border", "border-border-default"],
				subtle: ["bg-bg-subtle"],
				plain: [],
			},
			size: {
				sm: "h-4 text-2xs leading-3",
				md: "h-5 text-xs leading-4",
				lg: "h-6 text-sm leading-5",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "md",
		},
	});

	export type KbdVariants = VariantProps<typeof kbd>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The visual style of the component.
		 * @default "subtle"
		 */
		variant?: KbdVariants["variant"];
		/**
		 * The size of the component.
		 * @default "md"
		 */
		size?: KbdVariants["size"];
		/**
		 * Content to render inside the kbd.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "subtle",
		size = "md",
		class: className,
		children,
		...restProps
	}: Props = $props();

	const finalClass = $derived(
		kbd({
			variant,
			size,
			class: className,
		}),
	);
</script>

<kbd class={finalClass} {...restProps}>
	{@render children?.()}
</kbd>
