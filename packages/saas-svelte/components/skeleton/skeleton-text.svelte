<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * SkeletonText styles using tailwind-variants.
	 * Used to render text placeholder lines.
	 */
	export const skeletonText = tv({
		slots: {
			root: "flex flex-col w-full",
			line: [
				"rounded-md",
				"shrink-0",
				"h-4",
				"cursor-default",
				"pointer-events-none",
				"select-none",
				"before:invisible",
				"after:invisible",
			],
		},
		variants: {
			/**
			 * The animation variant.
			 * @default "pulse"
			 */
			variant: {
				pulse: {
					line: [
						"bg-bg-emphasized",
						"animate-[pulse_1.2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
					],
				},
				shine: {
					line: [
						"bg-clip-padding",
						"animate-[skeleton-shine_5s_ease-in-out_infinite]",
					],
				},
				none: {
					line: "bg-bg-emphasized",
				},
			},
		},
		defaultVariants: {
			variant: "pulse",
		},
	});

	export type SkeletonTextVariants = VariantProps<typeof skeletonText>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { VStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * The animation variant.
		 * @default "pulse"
		 */
		variant?: SkeletonTextVariants["variant"];
		/**
		 * The number of lines to render.
		 * @default 3
		 */
		noOfLines?: number;
		/**
		 * The gap between lines (uses Tailwind spacing scale).
		 * @default 2
		 */
		gap?: number;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "pulse",
		noOfLines = 3,
		gap = 2,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(skeletonText({ variant }));
	const rootClasses = $derived(twMerge(styles.root(), className));
	const lineClasses = $derived(styles.line());

	// Generate array for iteration
	const lines = $derived(Array.from({ length: noOfLines }, (_, i) => i));

	// Shine gradient needs inline style as tailwind-merge strips the gradient class
	const shineStyle = $derived(
		variant === "shine"
			? "background-image: linear-gradient(270deg, var(--color-bg-muted), var(--color-bg-emphasized), var(--color-bg-emphasized), var(--color-bg-muted)); background-size: 400% 100%;"
			: undefined,
	);
</script>

<VStack
	class={rootClasses}
	{gap}
	aria-hidden="true"
	{...restProps as Record<string, unknown>}
>
	{#each lines as _, index}
		<Box
			class={twMerge(
				lineClasses,
				index === noOfLines - 1 && "max-w-[80%]",
			)}
			style={shineStyle}
		></Box>
	{/each}
</VStack>
