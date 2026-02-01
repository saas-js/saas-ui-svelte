<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { Box } from "$saas/layout/box";
	import { DIALOG_CTX } from "./dialog-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext(DIALOG_CTX) as {
		scrollBehavior: "inside" | "outside";
	};
</script>

<Box
	class={twMerge(
		"flex-1 py-2 ps-6 pe-6 antialiased",
		ctx.scrollBehavior === "inside" && "overflow-y-auto",
		className,
	)}
	{...rest}
>
	{@render children()}
</Box>
