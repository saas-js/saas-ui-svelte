<script lang="ts">
import { Dialog } from "@ark-ui/svelte/dialog";
import { button, type ButtonVariants } from "../button/button.svelte";
import type { Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The action trigger content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Whether to render as a child element.
	 */
	asChild?: boolean;
	/**
	 * The button variant.
	 * @default "surface"
	 */
	variant?: ButtonVariants["variant"];
	/**
	 * The button size.
	 * @default "md"
	 */
	size?: ButtonVariants["size"];
	/**
	 * The colour theme of the button.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Additional inline styles.
	 */
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
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));
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
