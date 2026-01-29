<script lang="ts">
	import { Clipboard } from "@ark-ui/svelte/clipboard";
	import ClipboardText from "phosphor-svelte/lib/ClipboardText";
	import Check from "phosphor-svelte/lib/Check";
</script>

<Clipboard.Root value="npm i @saas-ui/svelte">
	<Clipboard.Trigger
		class="inline-flex h-10 cursor-pointer select-none items-center gap-3 whitespace-nowrap rounded-md border border-border-default bg-bg-default px-5 text-sm font-medium text-fg-default transition-colours hover:bg-bg-subtle focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	>
		<span class="text-fg-muted">$</span>
		<span>npm i @saas-ui/svelte</span>
		<Clipboard.Indicator>
			{#snippet copied()}
				<Check class="size-4 text-fg-success" />
			{/snippet}
			<ClipboardText class="size-4" />
		</Clipboard.Indicator>
	</Clipboard.Trigger>
</Clipboard.Root>
