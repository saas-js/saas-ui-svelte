<script lang="ts">
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { button, type ButtonVariants } from "../button/button.svelte";
	import { getContext, type Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { DIALOG_CTX, type DialogContext } from "./dialog-root.svelte";

	interface Props {
		children: Snippet;
		class?: string;
		asChild?: boolean;
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		colour?: ColourName; // Added colour prop
		style?: string;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		asChild = false,
		variant = "outline",
		size = "md",
		colour = "gray", // Default to gray to matches button defaults
		style,
		...rest
	}: Props = $props();

	const ctx = getContext<DialogContext>(DIALOG_CTX);
	const colourVars = $derived(getColourStyle(colour));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

	function handlePrefetch() {
		ctx?.onPrefetch?.();
	}
</script>

<Dialog.Trigger
	class={button({ variant, size, className })}
	style={finalStyle}
	asChild={asChild ? children : undefined}
	onmouseenter={handlePrefetch}
	onfocus={handlePrefetch}
	{...rest}
>
	{#if !asChild}
		{@render children()}
	{/if}
</Dialog.Trigger>
