<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const timelineContent = tv({
		base: "flex flex-col gap-2",
		variants: {
			width: {
				auto: "",
				full: "w-full pb-4",
			},
			flex: {
				true: "flex-1 pb-4",
				false: "",
			},
			alignItems: {
				"flex-start": "",
				"flex-end": "items-end text-right",
				center: "items-center text-center",
			},
		},
		compoundVariants: [
			{
				width: "auto",
				flex: true,
				class: "pb-0",
			},
		],
		defaultVariants: {
			width: "full",
			flex: false,
			alignItems: "flex-start",
		},
	});

	export type TimelineContentVariants = VariantProps<typeof timelineContent>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { VStack } from "$saas/layout/stack";

	interface Props {
		/**
		 * Content to render inside the content area.
		 */
		children?: Snippet;
		/**
		 * Additional classes to apply.
		 */
		class?: string;
		/**
		 * Flex value for alternating layouts.
		 */
		flex?: string | number;
		/**
		 * Alignment of items within the content.
		 */
		alignItems?: TimelineContentVariants["alignItems"];
		/**
		 * Width of the content area.
		 */
		width?: TimelineContentVariants["width"];
		[key: string]: any;
	}

	let {
		children,
		class: className,
		flex,
		alignItems,
		width,
		...restProps
	}: Props = $props();

	const hasFlex = $derived(flex === 1 || flex === "1");
	const classes = $derived(
		twMerge(
			timelineContent({ width, flex: hasFlex, alignItems }),
			className,
		),
	);
</script>

<VStack gap={2} class={classes} {...restProps}>
	{@render children?.()}
</VStack>
