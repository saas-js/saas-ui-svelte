<script lang="ts" module>
	// Wrapper components for complex Clipboard stories
</script>

<script lang="ts">
	import {
		ClipboardComponent as Clipboard,
		ClipboardButton,
		ClipboardIconButton,
		ClipboardInput,
		ClipboardPrimitive,
	} from "$saas/components/clipboard";

	interface Props {
		story: "basic" | "button" | "customLabels" | "input" | "timeout";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Clipboard value="https://saas-ui.dev">
		<ClipboardIconButton />
	</Clipboard>
{:else if story === "button"}
	<Clipboard value="https://saas-ui.dev">
		<ClipboardButton />
	</Clipboard>
{:else if story === "customLabels"}
	<Clipboard value="https://saas-ui.dev">
		<ClipboardButton label="Kopieer" copiedLabel="Gekopieerd" />
	</Clipboard>
{:else if story === "input"}
	<Clipboard
		value="https://saas-ui.dev/docs/components/clipboard"
		class="max-w-xs"
	>
		<ClipboardPrimitive.Control class="relative flex items-center w-full">
			<ClipboardInput class="pr-10" />
			<div class="absolute right-1 flex items-center justify-center">
				<ClipboardIconButton
					class="border-none shadow-none bg-transparent hover:bg-bg-subtle -mr-2"
				/>
			</div>
		</ClipboardPrimitive.Control>
	</Clipboard>
{:else if story === "timeout"}
	<Clipboard value="https://saas-ui.dev" timeout={1000}>
		<ClipboardButton />
	</Clipboard>
{/if}
