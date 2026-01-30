<script lang="ts">
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadTriggerProps } from "@ark-ui/svelte/file-upload";
import type { Snippet } from "svelte";
import { button, type ButtonVariants } from "$saas/components/button";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

interface Props extends Omit<FileUploadTriggerProps, "children"> {
	/**
	 * The visual style of the trigger button.
	 * @default "outline"
	 */
	variant?: ButtonVariants["variant"];
	/**
	 * The size of the trigger button.
	 * @default "sm"
	 */
	size?: ButtonVariants["size"];
	/**
	 * The colour palette of the trigger button.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * The content of the trigger button.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	variant = "outline",
	size = "sm",
	colour = "gray",
	children,
	class: className,
	...rest
}: Props = $props();

const colourStyle = $derived(getColourStyle(colour));
const classes = $derived(button({ variant, size, class: className }));
</script>

<ArkFileUpload.Trigger class={classes} style={colourStyle} {...rest}>
	{@render children?.()}
</ArkFileUpload.Trigger>
