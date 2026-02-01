<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import { twMerge } from "tailwind-merge";
	import { Icon } from "$saas/components/icon";
	import { actionBar } from "./action-bar.svelte";

	interface Props extends HTMLButtonAttributes {
		/**
		 * Accessible label for the close button.
		 * @default "Close"
		 */
		"aria-label"?: string;
	}

	let {
		"aria-label": ariaLabel = "Close",
		class: className,
		...restProps
	}: Props = $props();

	const styles = actionBar();
</script>

<button
	type="button"
	class={twMerge(styles.closeButton() as string, className as string)}
	data-part="action-bar-close-button"
	aria-label={ariaLabel}
	{...restProps}
>
	<Icon as={XIcon} size="sm" />
</button>
