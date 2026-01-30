<script lang="ts">
import { Dialog } from "@ark-ui/svelte";
import { button, type ButtonVariants } from "../button/button.svelte";
import type { Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * The trigger content.
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
	 * @default "outline"
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
	 * Whether the button is an icon-only button.
	 * @default false
	 */
	icon?: boolean;
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
	variant = "outline",
	size = "md",
	colour = "gray",
	icon = false,
	style,
	...rest
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<Dialog.Trigger
	class={button({ variant, size, icon, className })}
	style={finalStyle}
	asChild={asChild ? children : undefined}
	{...rest}
>
	{#if !asChild}
		{@render children()}
	{/if}
</Dialog.Trigger>
