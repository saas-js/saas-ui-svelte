<script lang="ts">
	import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
	import type { Snippet } from "svelte";
	import Check from "phosphor-svelte/lib/Check";
	import CopySimple from "phosphor-svelte/lib/CopySimple";
	import { clipboardButton } from "./clipboard.svelte";

	interface Props {
		/**
		 * Custom label text.
		 * @default "Copy"
		 */
		label?: string;
		/**
		 * Custom label text when copied.
		 * @default "Copied"
		 */
		copiedLabel?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Custom content for the button.
		 */
		children?: Snippet;
	}

	let {
		label = "Copy",
		copiedLabel = "Copied",
		class: className,
		children,
	}: Props = $props();
</script>

<ArkClipboard.Trigger
	class={clipboardButton({ class: className })}
	aria-label="Copy to clipboard"
>
	{#if children}
		{@render children()}
	{:else}
		<ArkClipboard.Indicator>
			<CopySimple class="size-3.5" weight="bold" aria-hidden="true" />
			{#snippet copied()}
				<Check class="size-3.5" weight="bold" aria-hidden="true" />
			{/snippet}
		</ArkClipboard.Indicator>
		<ArkClipboard.Indicator>
			<span>{label}</span>
			{#snippet copied()}
				<span>{copiedLabel}</span>
			{/snippet}
		</ArkClipboard.Indicator>
	{/if}
</ArkClipboard.Trigger>
