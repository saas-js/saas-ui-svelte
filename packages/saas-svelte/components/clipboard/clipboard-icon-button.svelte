<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import CheckIcon from "phosphor-svelte/lib/CheckIcon";
import CopySimpleIcon from "phosphor-svelte/lib/CopySimpleIcon";
import { twMerge } from "tailwind-merge";
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

let { "aria-label": ariaLabel = "Copy to clipboard", class: className }: Props =
	$props();
</script>

<ArkClipboard.Trigger
	class={twMerge(clipboardButton({ icon: true }), className as string)}
	aria-label={ariaLabel}
>
	<ArkClipboard.Indicator>
		<CopySimpleIcon class="size-3.5" weight="bold" aria-hidden="true" />
		{#snippet copied()}
			<CheckIcon class="size-3.5" weight="bold" aria-hidden="true" />
		{/snippet}
	</ArkClipboard.Indicator>
</ArkClipboard.Trigger>
