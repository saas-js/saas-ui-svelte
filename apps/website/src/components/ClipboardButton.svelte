<script lang="ts">
import { Clipboard } from "@ark-ui/svelte/clipboard";
import ClipboardText from "phosphor-svelte/lib/ClipboardText";
import Check from "phosphor-svelte/lib/Check";
</script>

<Clipboard.Root value="npm i @saas-ui/svelte">
	<Clipboard.Trigger
		class="border-border-default bg-bg-default text-fg-default transition-colours hover:bg-bg-subtle hover:border-border-emphasized inline-flex h-10 cursor-pointer items-center gap-3 rounded-md border px-5 text-sm font-medium whitespace-nowrap select-none outline-0 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring) focus-visible:border-(--c-focus-ring)"
		style="--c-focus-ring: var(--colors-gray-focus-ring)"
	>
		<span class="text-fg-muted">$</span>
		<span>npm i @saas-ui/svelte</span>
		<Clipboard.Indicator>
			{#snippet copied()}
				<Check class="text-fg-success size-4" />
			{/snippet}
			<ClipboardText class="size-4" />
		</Clipboard.Indicator>
	</Clipboard.Trigger>
</Clipboard.Root>
