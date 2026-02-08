<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * Skeleton styles using tailwind-variants.
	 * Used to render a placeholder while content is loading.
	 */
	export const skeleton = tv({
		base: "rounded-md shrink-0 before:invisible after:invisible",
		variants: {
			/**
			 * The animation variant.
			 * @default "pulse"
			 */
			variant: {
				pulse: [
					"bg-bg-emphasized",
					"animate-[pulse_1.2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
				],
				shine: [
					"bg-clip-padding",
					"animate-[skeleton-shine_5s_ease-in-out_infinite]",
				],
				none: "",
			},
			/**
			 * Whether the skeleton is in loading state.
			 * @default true
			 */
			loading: {
				true: "cursor-default pointer-events-none select-none",
				false: "animate-[fade-in_0.2s_ease-out]",
			},
		},
		defaultVariants: {
			variant: "pulse",
			loading: true,
		},
	});

	export type SkeletonVariants = VariantProps<typeof skeleton>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Box } from "$saas/layout/box";
	import { Text } from "$saas/typography/text";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * The content to render when not loading.
		 */
		children?: Snippet;
		/**
		 * Whether to show the skeleton loading state.
		 * @default true
		 */
		loading?: boolean;
		/**
		 * The animation variant.
		 * @default "pulse"
		 */
		variant?: SkeletonVariants["variant"];
		/**
		 * The height of the skeleton.
		 */
		height?: string;
		/**
		 * The width of the skeleton.
		 */
		width?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		loading = true,
		variant = "pulse",
		height,
		width,
		class: className,
		...restProps
	}: Props = $props();

	const classes = $derived(
		twMerge(
			skeleton({ variant: loading ? variant : "none", loading }),
			className,
		),
	);

	// Shine gradient needs inline style as tailwind-merge strips the gradient class
	const shineStyle = $derived(
		loading && variant === "shine"
			? "background-image: linear-gradient(270deg, var(--color-bg-muted), var(--color-bg-emphasized), var(--color-bg-emphasized), var(--color-bg-muted)); background-size: 400% 100%;"
			: "",
	);
</script>

<Box
	class={classes}
	style="{shineStyle}{loading && height
		? `height: ${height};`
		: ''}{loading && width ? `width: ${width};` : ''}"
	aria-hidden={loading || undefined}
	{...restProps}
>
	{#if children}
		<Text as="span" class={twMerge(loading ? "invisible" : undefined)}>
			{@render children()}
		</Text>
	{/if}
</Box>
