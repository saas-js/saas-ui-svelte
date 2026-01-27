<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import type { Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		children: Snippet;
		class?: string;
		asChild?: boolean;
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		colour?: ColourName;
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		asChild = false,
		variant = "surface",
		size = "md",
		colour = "gray",
		style,
		...rest
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);
</script>

<Dialog.CloseTrigger
	class={button({ variant, size, className })}
	style={finalStyle}
	asChild={asChild ? children : undefined}
	{...rest}
>
	{#if !asChild}
		{@render children()}
	{/if}
</Dialog.CloseTrigger>
