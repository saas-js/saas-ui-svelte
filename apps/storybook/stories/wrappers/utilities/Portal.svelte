<script lang="ts">
	import { Portal } from "$saas/components/portal";
	import { Button } from "$saas/components/button";
	import { Box } from "$saas/layout/box";

	interface Props {
		story: "basic" | "disabled" | "customContainer";
	}

	let { story }: Props = $props();

	let containerRef: HTMLDivElement | null = $state(null);
</script>

{#if story === "basic"}
	<div>
		<p class="text-fg-muted mb-4">
			The content below is rendered at the end of document.body via
			portal.
		</p>
		<Portal>
			<div
				class="bg-bg-subtle border-border-default fixed bottom-4 left-4 z-50 rounded-lg border p-4 shadow-lg"
			>
				<p class="text-sm">
					This is portal content (rendered at document.body)
				</p>
			</div>
		</Portal>
		<Button variant="outline">Regular button (for comparison)</Button>
	</div>
{:else if story === "disabled"}
	<div>
		<p class="text-fg-muted mb-4">
			When disabled, content renders in place instead of via portal.
		</p>
		<div class="border-border-default rounded border border-dashed p-4">
			<p class="mb-2 text-sm">Parent container:</p>
			<Portal disabled>
				<div
					class="bg-bg-subtle border-border-default rounded border p-4"
				>
					This content is rendered in place (portal disabled)
				</div>
			</Portal>
		</div>
	</div>
{:else if story === "customContainer"}
	<div>
		<p class="text-fg-muted mb-4">
			Portal content rendered into a custom container element.
		</p>
		<Portal container={containerRef}>
			<div class="bg-bg-emphasized rounded p-4">
				This content is rendered into the container below
			</div>
		</Portal>
		<div
			bind:this={containerRef}
			class="mt-4 min-h-20 rounded border-2 border-dashed border-blue-500 p-4"
		>
			<p class="text-fg-muted text-sm">
				Custom container (portal target)
			</p>
		</div>
	</div>
{/if}
