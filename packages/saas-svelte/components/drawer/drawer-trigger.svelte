<script lang="ts">
import { Dialog } from "@ark-ui/svelte";
import { button, type ButtonVariants } from "../button/button.svelte";
import { getContext, type Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import { twMerge } from "tailwind-merge";
import { DRAWER_CTX, type DrawerContext } from "./drawer-root.svelte";

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

const ctx = getContext<DrawerContext>(DRAWER_CTX);
const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

function handlePrefetch() {
	ctx?.onPrefetch?.();
}
</script>

<Dialog.Trigger
	class={button({ variant, size, icon, className })}
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
