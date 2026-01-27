<script lang="ts">
	import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
	import Check from "phosphor-svelte/lib/Check";
	import CopySimple from "phosphor-svelte/lib/CopySimple";
	import { clipboardButton } from "./clipboard.svelte";

	interface Props {
		/**
		 * Accessible label for the button.
		 * @default "Copy to clipboard"
		 */
		"aria-label"?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		"aria-label": ariaLabel = "Copy to clipboard",
		class: className,
	}: Props = $props();
</script>

<ArkClipboard.Trigger
	class={clipboardButton({ icon: true, class: className })}
	aria-label={ariaLabel}
>
	<ArkClipboard.Indicator>
		<CopySimple class="size-3.5" weight="bold" aria-hidden="true" />
		{#snippet copied()}
			<Check class="size-3.5" weight="bold" aria-hidden="true" />
		{/snippet}
	</ArkClipboard.Indicator>
</ArkClipboard.Trigger>
