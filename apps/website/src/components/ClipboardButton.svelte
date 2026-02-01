<script lang="ts">
	import { Clipboard } from "@ark-ui/svelte/clipboard";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Text } from "@saas-ui/svelte/typography/text";
	import ClipboardText from "phosphor-svelte/lib/ClipboardText";
	import Check from "phosphor-svelte/lib/Check";
</script>

<Clipboard.Root value="npm i @saas-ui/svelte">
	<Clipboard.Trigger
		class="border-border-default bg-bg-default text-fg-default transition-colours hover:bg-bg-subtle hover:border-border-emphasized inline-flex h-10 cursor-pointer items-center gap-3 rounded-md border px-5 text-sm font-medium whitespace-nowrap outline-0 select-none focus-visible:border-(--c-focus-ring) focus-visible:outline-(--c-focus-ring) focus-visible:outline-solid"
		style="--c-focus-ring: var(--colors-gray-focus-ring)"
		aria-label="Copy npm install command to clipboard"
	>
		<Text as="span" class="text-fg-muted">$</Text>
		<Text as="span">npm i @saas-ui/svelte</Text>
		<Clipboard.Indicator>
			{#snippet copied()}
				<Icon as={Check} size="sm" class="text-fg-success" />
			{/snippet}
			<Icon as={ClipboardText} size="sm" />
		</Clipboard.Indicator>
	</Clipboard.Trigger>
</Clipboard.Root>
