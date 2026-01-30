<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardTriggerProps } from "@ark-ui/svelte/clipboard";
import type { Snippet } from "svelte";
import { clipboardButton } from "./clipboard.svelte";

interface Props extends Omit<ClipboardTriggerProps, "children"> {
	/**
	 * Button size variant.
	 * @default "xs"
	 */
	size?: "xs" | "sm" | "md";
	/**
	 * Button style variant.
	 * @default "surface"
	 */
	variant?: "surface" | "ghost";
	/**
	 * Whether to render as an icon-only button.
	 */
	icon?: boolean;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Button content.
	 */
	children?: Snippet;
}

let {
	size = "xs",
	variant = "surface",
	icon = false,
	class: className,
	children,
	...rest
}: Props = $props();
</script>

<ArkClipboard.Trigger
	class={clipboardButton({ size, variant, icon, class: className })}
	{...rest}
>
	{@render children?.()}
</ArkClipboard.Trigger>
