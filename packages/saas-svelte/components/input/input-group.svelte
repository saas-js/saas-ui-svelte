<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";
	import { Flex } from "$saas/layout/flex";

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

<Flex
	inline
	align="center"
	justify="start"
	gap={2}
	class={twMerge("relative", "w-full", "isolate", "antialiased", className)}
	{...restProps}
>
	{@render children?.()}
</Flex>
