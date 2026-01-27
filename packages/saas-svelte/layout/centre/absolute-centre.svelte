<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The axis to center on.
		 * - "horizontal": Centers horizontally only
		 * - "vertical": Centers vertically only
		 * - "both": Centers both horizontally and vertically
		 * @default "both"
		 */
		axis?: "horizontal" | "vertical" | "both";
		/**
		 * The content to render inside the absolute center container.
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
		axis = "both",
		children,
		class: className,
		...restProps
	}: Props = $props();

	const positionClasses = $derived.by(() => {
		switch (axis) {
			case "horizontal":
				return "absolute left-1/2 -translate-x-1/2";
			case "vertical":
				return "absolute top-1/2 -translate-y-1/2";
			case "both":
			default:
				return "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
		}
	});
</script>

<div
	class={twMerge(positionClasses, "flex items-center justify-center", className)}
	{...restProps}
>
	{@render children?.()}
</div>
