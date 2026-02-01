<script lang="ts">
	import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
	import { twMerge } from "tailwind-merge";
	import { clipboardInput } from "./clipboard.svelte";

	interface Props {
		/**
		 * Accessible label for the input field.
		 * @default "Clipboard value"
		 */
		"aria-label"?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		"aria-label": ariaLabel = "Clipboard value",
		class: className,
	}: Props = $props();
</script>

<ArkClipboard.Input
	class={twMerge(clipboardInput(), className as string)}
	aria-label={ariaLabel}
/>
