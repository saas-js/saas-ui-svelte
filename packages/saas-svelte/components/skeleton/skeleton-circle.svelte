<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * SkeletonCircle styles using tailwind-variants.
	 * Used to render a circular placeholder (e.g., for avatars).
	 */
	export const skeletonCircle = tv({
		base: [
			"rounded-full",
			"shrink-0",
			"cursor-default",
			"pointer-events-none",
			"select-none",
			"flex",
			"items-center",
			"justify-center",
			"before:invisible",
			"after:invisible",
		],
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
				none: "bg-bg-emphasized",
			},
			/**
			 * The size of the circle.
			 * @default "10"
			 */
			size: {
				"6": "w-6 h-6",
				"8": "w-8 h-8",
				"10": "w-10 h-10",
				"12": "w-12 h-12",
				"14": "w-14 h-14",
				"16": "w-16 h-16",
			},
		},
		defaultVariants: {
			variant: "pulse",
			size: "10",
		},
	});

	export type SkeletonCircleVariants = VariantProps<typeof skeletonCircle>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * The animation variant.
		 * @default "pulse"
		 */
		variant?: SkeletonCircleVariants["variant"];
		/**
		 * The size of the circle (uses Tailwind spacing scale).
		 * @default "10"
		 */
		size?: SkeletonCircleVariants["size"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "pulse",
		size = "10",
		class: className,
		...restProps
	}: Props = $props();

	const classes = $derived(
		twMerge(skeletonCircle({ variant, size }), className),
	);

	// Shine gradient needs inline style as tailwind-merge strips the gradient class
	const shineStyle = $derived(
		variant === "shine"
			? "background-image: linear-gradient(270deg, var(--color-bg-muted), var(--color-bg-emphasized), var(--color-bg-emphasized), var(--color-bg-muted)); background-size: 400% 100%;"
			: undefined,
	);
</script>

<div class={classes} style={shineStyle} aria-hidden="true" {...restProps}></div>
