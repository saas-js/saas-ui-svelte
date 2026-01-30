<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The maximum width of the container.
		 * @default "8xl"
		 */
		maxW?:
			| "sm"
			| "md"
			| "lg"
			| "xl"
			| "2xl"
			| "3xl"
			| "4xl"
			| "5xl"
			| "6xl"
			| "7xl"
			| "8xl"
			| "full";
		/**
		 * Whether the container should be fluid (full width).
		 * @default false
		 */
		fluid?: boolean;
		/**
		 * Whether to center the content inside the container.
		 * @default false
		 */
		centerContent?: boolean;
		/**
		 * The content to render inside the container.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Additional HTML attributes to spread onto the element.
		 */
		[key: string]: unknown;
	}

	let {
		maxW = "8xl",
		fluid = false,
		centerContent = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const maxWidthMap = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		"5xl": "max-w-5xl",
		"6xl": "max-w-6xl",
		"7xl": "max-w-7xl",
		"8xl": "max-w-360",
		full: "max-w-full",
	} as const;
</script>

<div
	class={twMerge(
		"w-full mx-auto px-4 md:px-6 lg:px-8",
		fluid ? "max-w-full" : maxWidthMap[maxW],
		centerContent && "flex items-center justify-center",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
