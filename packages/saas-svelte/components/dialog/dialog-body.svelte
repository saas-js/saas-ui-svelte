<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
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

<div
	class={twMerge(
		"flex-1",
		"ps-6",
		"pe-6",
		"py-2",
		"antialiased",
		ctx.scrollBehavior === "inside" && "overflow-y-auto",
		className,
	)}
	{...rest}
>
	{@render children()}
</div>
