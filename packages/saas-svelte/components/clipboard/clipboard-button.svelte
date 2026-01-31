<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import type { Snippet } from "svelte";
import CheckIcon from "phosphor-svelte/lib/CheckIcon";
import CopySimpleIcon from "phosphor-svelte/lib/CopySimpleIcon";
import { twMerge } from "tailwind-merge";
import { clipboardButton } from "./clipboard.svelte";
import { Text } from "$saas/typography/text";

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
	class={twMerge(clipboardButton(), className as string)}
	aria-label="Copy to clipboard"
>
	{#if children}
		{@render children()}
	{:else}
		<ArkClipboard.Indicator>
			<CopySimpleIcon class="size-3.5" weight="bold" aria-hidden="true" />
			{#snippet copied()}
				<CheckIcon class="size-3.5" weight="bold" aria-hidden="true" />
			{/snippet}
		</ArkClipboard.Indicator>
		<ArkClipboard.Indicator>
			<Text as="span">{label}</Text>
			{#snippet copied()}
				<Text as="span">{copiedLabel}</Text>
			{/snippet}
		</ArkClipboard.Indicator>
	{/if}
</ArkClipboard.Trigger>
