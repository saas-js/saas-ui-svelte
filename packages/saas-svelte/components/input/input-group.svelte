<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The content to be rendered inside the component.
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<div
	class={twMerge(
		"relative",
		"inline-flex",
		"w-full",
		"isolate",
		"gap-y-2",
		"gap-x-2",
		"items-center",
		"justify-start",
		"antialiased",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
