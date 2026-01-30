<script lang="ts">
import { Editable } from "@ark-ui/svelte/editable";
import { button, type ButtonVariants } from "../button/button.svelte";
import type { Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * The content to render inside the trigger.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Button variant.
	 */
	variant?: ButtonVariants["variant"];
	/**
	 * Button size.
	 */
	size?: ButtonVariants["size"];
	/**
	 * Button colour.
	 */
	colour?: ColourName;
	/**
	 * Whether this is an icon-only button.
	 */
	icon?: boolean;
	/**
	 * Additional inline styles.
	 */
	style?: string;
	/**
	 * Additional props passed to Ark UI.
	 */
	[key: string]: any;
}

let {
	children,
	class: className,
	variant = "outline",
	size = "xs",
	colour = "gray",
	icon = false,
	style,
	...restProps
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<Editable.CancelTrigger
	class={button({ variant, size, icon, className })}
	style={finalStyle}
	{...restProps}
>
	{@render children?.()}
</Editable.CancelTrigger>
